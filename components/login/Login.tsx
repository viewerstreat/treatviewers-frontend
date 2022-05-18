import React, {useState} from 'react';
import {
  Box,
  Center,
  CheckIcon,
  ChevronRightIcon,
  Divider,
  Flex,
  Heading,
  HStack,
  Image,
  Input,
  Stack,
  Text,
} from 'native-base';
import {ImageBackground, StyleSheet} from 'react-native';

function Login() {
  return (
    <Box style={styles.container}>
      <ImageBackground
        source={require('../../images/bgimage.png')}
        resizeMode="cover"
        style={styles.imagebg}>
        <Header />
        <Box style={styles.wrapper1}>
          <Center
            width="60%"
            ml="20%"
            mb="5"
            _text={{
              fontSize: '2xl',
              fontWeight: 'bold',
              color: 'white.700',
              textAlign: 'center',
            }}>
            Earn Real Money By Winning Contests!
          </Center>
          <Center
            _text={{
              fontSize: 'lg',
              color: 'white.700',
            }}>
            You heard that right!
          </Center>
          <Center
            width="90%"
            ml="5%"
            mb="5"
            _text={{
              fontSize: 'lg',
              color: 'white.700',
              textAlign: 'center',
            }}>
            Participate in any ongoing contests, beat your opponents, earn real
            money. Earn some extra by sharing the word.
          </Center>
          <Center
            mb="5"
            _text={{
              fontSize: '2xl',
              color: 'white.700',
            }}>
            What are you waiting for?
          </Center>
          <Box style={styles.container}>
            <LoginForm />
          </Box>
        </Box>
        <Footer />
      </ImageBackground>
    </Box>
  );
}

function Header() {
  return (
    <Box>
      <Box bg="primary.700" p="5">
        <Heading size="xl" color="white.700">
          Treat Viewer
        </Heading>
      </Box>
      <Divider bg="red.700" thickness="5" />
    </Box>
  );
}

function Footer() {
  return (
    <Flex direction="row" bg="primary.700" p="5" justifyContent="space-between">
      <Box style={styles.iconImage}>
        <Image source={require('../../images/feed-icon.png')} alt="feed" />
      </Box>
      <Box style={styles.iconImage}>
        <Image
          source={require('../../images/leaderboard-icon.png')}
          alt="leaderboard"
        />
      </Box>
      <Box style={styles.iconImage}>
        <Image source={require('../../images/clip-icon.png')} alt="clip" />
      </Box>
      <Box style={styles.iconImage}>
        <Image source={require('../../images/noti-icon.png')} alt="noti" />
      </Box>
      <Box style={styles.iconImage}>
        <Image
          source={require('../../images/profile-icon.png')}
          alt="profile"
        />
      </Box>
    </Flex>
  );
}

function SocialIcons() {
  return (
    <HStack pb="10" pt="10" space="10" justifyContent="center">
      <Image source={require('../../images/fb-icon.png')} alt="facebook" />
      <Image
        source={require('../../images/instagram-icon.png')}
        alt="instagram"
      />
      <Image source={require('../../images/google-icon.png')} alt="google" />
    </HStack>
  );
}

function LoginForm() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [showCheckIcon, setShowCheckIcon] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const onPressSignup = () => {
    console.log('onPressSignup');
  };

  const onChangePhone = (val: string) => {
    console.log(val);
    if (val && val.length > 10) {
      return;
    }
    setPhone(val);
    if (val && val.length === 10) {
      setShowCheckIcon(true);
      setShowOtpInput(true);
    } else {
      setShowCheckIcon(false);
      setOtp('');
    }
  };

  const onChangeOtp = (val: string) => {
    setOtp(val);
  };

  const onClickGo = () => {
    console.log('onClickGo');
  };

  return (
    <Box style={styles.loginFormWrapper} pt="5">
      <Box>
        <HStack space={3} justifyContent="center" alignItems="center">
          <Box>
            <Image
              source={require('../../images/profile-icon.png')}
              alt="profile"
            />
            <Text color="white.700" underline onPress={onPressSignup}>
              Sign Up
            </Text>
          </Box>
          <Stack width="60%" direction="column" space="2">
            <HStack width="100%" alignItems="center">
              <Input
                size="md"
                placeholder="Enter phone no"
                width="90%"
                variant="rounded"
                bgColor="white.700"
                keyboardType="numeric"
                value={phone}
                onChangeText={onChangePhone}
              />
              {showCheckIcon ? (
                <CheckIcon size="7" ml="2" color="white.700" />
              ) : (
                false
              )}
            </HStack>
            {showOtpInput ? (
              <HStack width="100%" alignItems="center">
                <Input
                  size="md"
                  placeholder="Enter OTP"
                  width="90%"
                  variant="rounded"
                  bgColor="white.700"
                  keyboardType="numeric"
                  value={otp}
                  onChangeText={onChangeOtp}
                />
                <Center
                  width="10"
                  height="10"
                  borderRadius="full"
                  ml="2"
                  borderWidth="1"
                  borderColor="white.700">
                  <ChevronRightIcon
                    size="5"
                    color="white.700"
                    onPress={onClickGo}
                  />
                </Center>
              </HStack>
            ) : (
              false
            )}
          </Stack>
        </HStack>
      </Box>
      <SocialIcons />
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imagebg: {
    flex: 1,
  },

  iconImage: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 1,
    borderStyle: 'solid',
  },

  wrapper1: {
    flex: 1,
    padding: 10,
  },

  loginFormWrapper: {
    backgroundColor: 'rgba(52, 52, 52, 0.1)',
  },
});
export default Login;
