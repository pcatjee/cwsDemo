import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import {colors} from '../constants/Theme';
import UserIcon from 'react-native-vector-icons/FontAwesome5';
import LockIcon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
// import { useForm, Controller } from "react-hook-form";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const apiUrl =
    'https://wme-staging-backend.herokuapp.com/api/v1/executives/getExecutiveLogin';

  //   const handleLogin = async (formData) => {
  //     setIsLoading(true);
  //     fetch(`${apiUrl}?mobile=${formData.mobile}&password=${formData.password}`)
  //       .then((response) => {
  //         setIsLoading(false);
  //         if (response.ok) {
  //           return response.json();
  //         } else {
  //           throw new Error("Wrong Credentials");
  //         }
  //       })
  //       .then((data) => {
  //         ToastAndroid.show("Successfully Logged In", ToastAndroid.SHORT);
  //         console.log(data);
  //         AsyncStorage.setItem("token", data.token);
  //         navigation.navigate("Home");
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   };

  // form
  //   const {
  //     control,
  //     handleSubmit,
  //     formState: { errors },
  //   } = useForm({
  //     defaultValues: {
  //       mobile: "",
  //       password: "",
  //     },
  //   });
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign in</Text>
      <View style={styles.inputbox}>
        <UserIcon name="user-alt" size={15} color={'grey'} />

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              keyboardType="number-pad"
              autoCapitalize="none"
            />
          )}
          name="mobile"
        />
        {errors.mobile && <Text style={{color: 'red'}}>This is required.</Text>}
      </View>

      <View style={styles.inputbox}>
        <LockIcon name="lock" size={20} color={'grey'} />

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.input}
              placeholder="Password"
              onChangeText={onChange}
              value={value}
              onBlur={onBlur}
              secureTextEntry={true}
              autoCapitalize="none"
            />
          )}
          name="password"
        />
        {errors.password && (
          <Text style={{color: 'red'}}>This is required.</Text>
        )}
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit(handleLogin)}>
        <Text style={styles.buttonText}>Sign in</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.text}>Forgot password?</Text>
      </TouchableOpacity>

      {isLoading && (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 5,
          }}>
          {ToastAndroid.show('Please Wait...', ToastAndroid.SHORT)}
          <Text>Please wait...</Text>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    marginBottom: 32,
  },
  inputbox: {
    width: '80%',
    height: 48,
    borderRadius: 20,
    padding: 10,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lighterGrey,
  },
  input: {
    marginLeft: 20,
    backgroundColor: colors.lighterGrey,
  },
  button: {
    backgroundColor: colors.primary,
    width: '80%',
    height: 48,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  text: {
    marginTop: 20,
  },
});
