import java.io.File
import java.io.FileInputStream
import java.security.KeyStore

plugins {
    alias(libs.plugins.android.application)
}

data class ResolvedSigningConfig(
    val storeFile: File,
    val storePassword: String,
    val keyAlias: String,
    val keyPassword: String
)

fun findPlatformReleaseSigning(): ResolvedSigningConfig? {
    // 1. Collect all candidate keystore file paths
    val candidatePaths = mutableListOf<String>()

    // Environment variables used across various CI / AI Studio publishing pipelines
    listOf(
        "RELEASE_STORE_FILE",
        "KEYSTORE_PATH",
        "STORE_FILE",
        "KEYSTORE_FILE",
        "RELEASE_KEYSTORE_PATH",
        "SIGNING_KEYSTORE_PATH",
        "ANDROID_KEYSTORE_PATH",
        "ANDROID_SIGNING_STORE_FILE",
        "GOOGLE_PLAY_KEYSTORE_PATH",
        "PLAY_STORE_KEYSTORE_PATH",
        "UPLOAD_KEYSTORE_PATH"
    ).forEach { envVar ->
        System.getenv(envVar)?.takeIf { it.isNotBlank() }?.let { candidatePaths.add(it) }
    }

    // Gradle Project properties
    listOf(
        "RELEASE_STORE_FILE",
        "RELEASE_KEYSTORE_PATH",
        "STORE_FILE",
        "KEYSTORE_PATH",
        "android.injected.signing.store.file",
        "signing.store.file"
    ).forEach { prop ->
        (findProperty(prop) as? String)?.takeIf { it.isNotBlank() }?.let { candidatePaths.add(it) }
    }

    // Scan /tmp directory for any platform-injected keystores (e.g. /tmp/keystore-*.jks)
    val tmpDir = File("/tmp")
    if (tmpDir.exists() && tmpDir.isDirectory) {
        tmpDir.listFiles()?.filter { file ->
            val name = file.name.lowercase()
            file.isFile &&
            !name.contains("debug") &&
            (name.startsWith("keystore") || name.endsWith(".jks") || name.endsWith(".keystore") || name.endsWith(".p12"))
        }?.forEach { candidatePaths.add(it.absolutePath) }
    }

    // Filter candidate paths that actually exist and are non-empty files and NOT debug.keystore
    val validStoreFile = candidatePaths
        .map { File(it) }
        .firstOrNull { it.exists() && it.isFile && it.length() > 0 && !it.name.contains("debug.keystore") }
        ?: return null

    // 2. Candidate passwords to attempt
    val candidatePasswords = mutableListOf<String>()
    listOf(
        "RELEASE_STORE_PASSWORD",
        "KEYSTORE_PASSWORD",
        "STORE_PASSWORD",
        "RELEASE_KEYSTORE_PASSWORD",
        "SIGNING_KEYSTORE_PASSWORD",
        "ANDROID_SIGNING_STORE_PASSWORD",
        "RELEASE_KEY_PASSWORD",
        "KEY_PASSWORD",
        "SIGNING_KEY_PASSWORD"
    ).forEach { envVar ->
        System.getenv(envVar)?.takeIf { it.isNotBlank() }?.let { candidatePasswords.add(it) }
    }

    listOf(
        "RELEASE_STORE_PASSWORD",
        "KEYSTORE_PASSWORD",
        "STORE_PASSWORD",
        "RELEASE_KEYSTORE_PASSWORD",
        "android.injected.signing.store.password",
        "android.injected.signing.key.password"
    ).forEach { prop ->
        (findProperty(prop) as? String)?.takeIf { it.isNotBlank() }?.let { candidatePasswords.add(it) }
    }

    candidatePasswords.addAll(listOf("android", "", "password", "storepass", "keypass"))
    val distinctPasswords = candidatePasswords.distinct()

    // 3. Explicit alias candidate (ignore androiddebugkey for release)
    val explicitAliasCandidates = mutableListOf<String>()
    listOf(
        "RELEASE_KEY_ALIAS",
        "KEY_ALIAS",
        "RELEASE_ALIAS",
        "KEYSTORE_ALIAS",
        "SIGNING_KEY_ALIAS",
        "UPLOAD_KEY_ALIAS"
    ).forEach { envVar ->
        System.getenv(envVar)?.takeIf { it.isNotBlank() && it != "androiddebugkey" }?.let { explicitAliasCandidates.add(it) }
    }
    listOf(
        "RELEASE_KEY_ALIAS",
        "KEY_ALIAS",
        "android.injected.signing.key.alias"
    ).forEach { prop ->
        (findProperty(prop) as? String)?.takeIf { it.isNotBlank() && it != "androiddebugkey" }?.let { explicitAliasCandidates.add(it) }
    }

    // 4. Dynamically inspect the keystore to find the REAL alias and verify passwords
    val storeTypes = listOf("JKS", "PKCS12", KeyStore.getDefaultType()).distinct()

    for (storeType in storeTypes) {
        for (pwd in distinctPasswords) {
            try {
                val ks = KeyStore.getInstance(storeType)
                FileInputStream(validStoreFile).use { fis ->
                    ks.load(fis, pwd.toCharArray())
                }

                val aliases = ks.aliases().toList()
                if (aliases.isEmpty()) continue

                // Find valid key entry alias
                val selectedAlias = explicitAliasCandidates.firstOrNull { ks.containsAlias(it) }
                    ?: aliases.firstOrNull { ks.isKeyEntry(it) && it != "androiddebugkey" }
                    ?: aliases.firstOrNull { it != "androiddebugkey" }
                    ?: aliases.firstOrNull()

                if (selectedAlias != null) {
                    var validKeyPass = pwd
                    for (kpwd in distinctPasswords) {
                        try {
                            if (ks.isKeyEntry(selectedAlias)) {
                                val key = ks.getKey(selectedAlias, kpwd.toCharArray())
                                if (key != null) {
                                    validKeyPass = kpwd
                                    break
                                }
                            }
                        } catch (_: Exception) {}
                    }

                    println(">>> [TileStory Release Signing] Located platform keystore: ${validStoreFile.absolutePath}")
                    println(">>> [TileStory Release Signing] Dynamic REAL key alias discovered: '$selectedAlias'")
                    return ResolvedSigningConfig(
                        storeFile = validStoreFile,
                        storePassword = pwd,
                        keyAlias = selectedAlias,
                        keyPassword = validKeyPass
                    )
                }
            } catch (_: Exception) {
                // Try next password or format
            }
        }
    }

    if (explicitAliasCandidates.isNotEmpty() && distinctPasswords.isNotEmpty()) {
        val alias = explicitAliasCandidates.first()
        val pwd = distinctPasswords.first()
        return ResolvedSigningConfig(
            storeFile = validStoreFile,
            storePassword = pwd,
            keyAlias = alias,
            keyPassword = pwd
        )
    }

    return null
}

val platformReleaseSigning = findPlatformReleaseSigning()

android {
    namespace = "com.volkanolgac.tilestory"
    compileSdk = 36

    defaultConfig {
        applicationId = "com.volkanolgac.tilestory"
        minSdk = 24
        targetSdk = 36
        versionCode = 2
        versionName = "2.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }

    signingConfigs {
        if (platformReleaseSigning != null) {
            create("release") {
                storeFile = platformReleaseSigning.storeFile
                storePassword = platformReleaseSigning.storePassword
                keyAlias = platformReleaseSigning.keyAlias
                keyPassword = platformReleaseSigning.keyPassword
            }
        }
        getByName("debug") {
            storeFile = file("${rootDir}/debug.keystore")
            storePassword = "android"
            keyAlias = "androiddebugkey"
            keyPassword = "android"
        }
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
            if (platformReleaseSigning != null) {
                signingConfig = signingConfigs.getByName("release")
            }
        }
        debug {
            signingConfig = signingConfigs.getByName("debug")
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_21
        targetCompatibility = JavaVersion.VERSION_21
    }
}

dependencies {
    implementation(libs.androidx.core.ktx)
    implementation(libs.androidx.lifecycle.runtime.ktx)
    implementation(libs.androidx.activity.compose)
    implementation(platform(libs.androidx.compose.bom))
    implementation(libs.androidx.ui)
    implementation(libs.androidx.ui.graphics)
    implementation(libs.androidx.ui.tooling.preview)
    implementation(libs.androidx.material3)
    implementation(libs.androidx.webkit)
}
