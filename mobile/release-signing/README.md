# Release signing

This directory holds the release-signing keystore for the Android fork —
**never committed, see `.gitignore`**. The actual keystore, its password, and
any built `.apk` live here locally/per-session only; they were delivered to
you directly (see the session that built them) and you're responsible for
keeping your own copy somewhere safe (a password manager, an encrypted
backup — not this repo).

**Why it matters:** Android only accepts an update to an already-installed
app if the new APK is signed by the *same* key as the one already on the
device. Lose the keystore and a future rebuild can't update the app in
place — users have to uninstall the old one and sideload the new one fresh,
losing nothing in this app's case (progress lives in on-device SQLite, not
tied to the install) but still a worse experience than an in-place update.

**To build and sign a release APK yourself:**

```bash
# from mobile/
npm run build
npx cap sync android
cd android
./gradlew assembleRelease

# zipalign + sign (adjust paths/versions to your Android SDK build-tools)
BUILD_TOOLS=$ANDROID_HOME/build-tools/<version>
$BUILD_TOOLS/zipalign -v -p 4 \
  app/build/outputs/apk/release/app-release-unsigned.apk \
  /tmp/the-manual-aligned.apk
$BUILD_TOOLS/apksigner sign \
  --ks ../release-signing/the-manual-release.keystore \
  --ks-key-alias the-manual \
  --out ../release-signing/the-manual.apk \
  /tmp/the-manual-aligned.apk
```

To generate a *new* keystore (only do this if you're starting fresh — reuse
the existing one for every update to the same install):

```bash
keytool -genkeypair -v \
  -keystore the-manual-release.keystore \
  -alias the-manual -keyalg RSA -keysize 2048 -validity 10000
```
