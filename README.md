# trailsbuddy

## Code Style Guidelines
1. Variables, functions etc. should be followed `camelCase` naming convention. While `variable` and `function` starts with lower case letter, `interface`, `class`, `type` name starts with upper case letter. Do not use variable with `_` (`snake_case`). Exception is functional components. Even if it is a function, it should follow the naming convention of a class. 
2. `Constants` are named with all upper case letters with `_` seperator. `enum`, `type` can have same style as well. 
3. Typically all file names should start with lower case letter except the `Component` files. 
3. Use `prettier` extension with `Format On Save` option. `.prettierrc` file is already added to the project.
4. Remove all unused imports and unused variables. 
5. Do not use `Redundant double negation`. [eslintno-extra-boolean-cast](https://eslint.org/docs/latest/rules/no-extra-boolean-cast)
6. Do not use `typescript` type as `any` unless there is no better way around. 
7. Do not use inline style.
8. Expected '===' and instead saw '=='. eslint eqeqeq












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

### Changes required for package `react-native-upi-pay`

- Link the package.

```
npx react-native link react-native-upi-pay
```

- Add typescript definition for the package. Add a new file `node_modules/react-native-upi-pay/index.d.ts`.
  Add the below content inside it.

```
declare module RNUpiPayment {
    interface UpiConfig {
        vpa: string;
        amount: string;
        payeeName: string;
        transactionRef: string;
        transactionNote: string;
    }
    type Fn = (data: any) => void;
    function initializePayment(config: UpiConfig, success: Fn, failure: Fn): void;
}

export default RNUpiPayment;
```

- Open the file `node_modules/react-native-upi-pay/android/build.gradle`.
  Modify below two lines as shown below -

```
dependencies {
    implementation 'com.facebook.react:react-native:+'
    implementation 'com.google.code.gson:gson:2.8.0'
}
```
