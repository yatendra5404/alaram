# alaram

Android Jetpack Compose alarm app scaffold. Includes:

- Exact alarms via AlarmManager.setExactAndAllowWhileIdle
- BroadcastReceiver -> ForegroundService -> Full-screen Activity using full-screen notification
- Compose UI with simple animation

Build instructions (requires Android SDK, JDK 17 and Gradle):

1. Install Android SDK and set `ANDROID_HOME`/`ANDROID_SDK_ROOT`.
2. From workspace root run:

```bash
./gradlew :app:assembleRelease
```

The generated APK will be at `app/build/outputs/apk/release/app-release.apk`.

Notes:
- Building an APK requires an Android toolchain not present in this container. I scaffolded the project and provided build steps above — I can help run a build if you provide an environment with Android SDK or ask me to create a GitHub Actions workflow to build the APK in CI.
