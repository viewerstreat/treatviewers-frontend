# trailsbuddy

### To force exoplayer in `react-native-video` modify the `android/settings.gradle` file like below -

```
include ':react-native-video'
project(':react-native-video').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-video/android-exoplayer')
```

Also modify the `node_modules/react-native-video/android-exoplayer/build.gradle` file and change version to `2.13.3`

```
    implementation('com.google.android.exoplayer:exoplayer:2.13.3') {
        exclude group: 'com.android.support'
    }

    implementation('com.google.android.exoplayer:extension-okhttp:2.13.3') {
        exclude group: 'com.squareup.okhttp3', module: 'okhttp'
    }
```

### Handle warning

`Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode.`

Update the `node_modules/react-native-slider/src/Slider.js` and `node_modules/react-native-slider/lib/Slider.js`. Replace `componentWillMount` with `UNSAFE_componentWillMount` and `componentWillReceiveProps` with `UNSAFE_componentWillReceiveProps` in all places.
