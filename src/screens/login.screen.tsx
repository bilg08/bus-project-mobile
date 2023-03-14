// import React, { useEffect, useState } from 'react';
// import {Button, SafeAreaView, StyleSheet, TextInput} from 'react-native';
// import firestore from '@react-native-firebase/firestore';
// import auth from '@react-native-firebase/auth';
// import { useUserContext } from '../context/user';
// type UserInput = {
//   email: string;
//   password: string;
// }
// export function Login({navigation}) {
//   const [userInput, setUserInput] = useState<UserInput>();
//   const {login} = useUserContext();
//   async function signin({email, password}: UserInput) {
//     try {
//       const res = await auth().signInWithEmailAndPassword(email, password);
//       login(res.user);
//       navigation.push('Home');
//     } catch (error) {
//       console.log(error,'error')
//     }
//   }
//   useEffect(() => {
//     // signin();
//   }, []);
//   return (
//     <SafeAreaView style={styles.body}>
//       <TextInput onChangeText={text => setUserInput({...userInput, email: text})} value={userInput?.email} placeholder='email'/>
//       <TextInput onChangeText={text => setUserInput({...userInput, password: text})} value={userInput?.password} placeholder='password'/>
//       <Button onPress={() => signin(userInput)} title='Нэвтрэх'/>
//       <Button title='Бүртгүүлэх'/>
//     </SafeAreaView>
//   );
// }
// const styles = StyleSheet.create({
//   body: {
//     flex: 1,
//   },
// })
import {
  Button,
  SafeAreaView, StyleSheet, Text,
} from 'react-native';
import React, { useState } from 'react';
import * as yup from 'yup';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import InputWithLabel from '../components/InputWithLabel';
import { ScrollView } from 'react-native-gesture-handler';
import { Formik } from 'formik';
import FlashMessage, { showMessage } from 'react-native-flash-message';

type UserType = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
};

const styles = StyleSheet.create({
  body: {
    width: 300,
    marginRight: 'auto',
    marginLeft: 'auto',
  },
});
export function Login({ navigation }: NavigationStackScreenProps) :JSX.Element {
  const [editable, setEditable] = useState(true);
  const [isEditing] = useState(false);
  const initialValues: UserType = {
    firstName:  '',
    lastName: '',
    email:  '',
    phoneNumber: '',
  };

  async function onSubmit(values: UserType) {
    // if (!editable) setEditable(true);
    // else {
    //   if (imageUri) {
    //     updateUserPicture(imageUri, token);
    //     dispatch(Actions.updateUserPicture(imageUri));
    //   }
    //   updateUserProfile(values, token).then(() => {
    //     dispatch(Actions.updateUserProfile(values));
    //     showMessage({
    //       message: 'Амжилттай',
    //       description: 'Амжилттай хадгалагдлаа',
    //       type: 'default',
    //       backgroundColor: '#1a294f',
    //       color: 'white',
    //     });
    //     navigation.goBack();
    //   });
    // }
  }
  const validation = yup.object().shape({
    firstName: yup.string().trim().required(),
    lastName: yup.string().trim().required(),
    email: yup.string().matches(/.+@.+\.[A-Za-z]+$/),
    phoneNumber: yup.string().min(8),
  });
  const options = {
    mediaType: 'photo',
    maxWidth: 0,
    maxHeight: 0,
    quality: 1,
    includeBase64: true,
    includeExtra: true,
    presentationStyle: 'fullScreen',
  };

  const handleImage = () => {
    // ImagePicker.launchImageLibrary(options, async (response : { assets:[{ uri:string }] }) => {
    //   if (response) {
    //     setImageUri(response?.assets[0]?.uri);
    //   }
    // });
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={styles.body}
        showsVerticalScrollIndicator={false}
      >
        <Formik
          validationSchema={validation}
          onSubmit={(values) => console.log(values)}
          initialValues={initialValues}
        >
          {({
            handleChange, handleSubmit, isValid, values, errors,
          }) => (
            <>
                <InputWithLabel
                  error={!errors.lastName}
                  editable={editable}
                  isEditing={isEditing}
                  onChange={handleChange('lastName')}
                  label="Таны овог"
                  value={values.lastName}
                />
                {errors.lastName && <Text>{errors.lastName}</Text>}
                <InputWithLabel
                  error={!errors.firstName}
                  editable={editable}
                  isEditing={isEditing}
                  onChange={handleChange('firstName')}
                  label="Таны нэр"
                  value={values.firstName}
                />
                {errors.firstName && <Text>{errors.firstName}</Text>}

                <InputWithLabel
                  error={!errors.phoneNumber}
                  editable={editable}
                  isEditing={isEditing}
                  onChange={handleChange('phoneNumber')}
                  label="Утасны дугаар"
                  value={values.phoneNumber}
                />
                {errors.phoneNumber && <Text>{errors.phoneNumber}</Text>}

                <InputWithLabel
                  error={!errors.email}
                  editable={editable}
                  isEditing={isEditing}
                  onChange={handleChange('email')}
                  label="Таны имайл"
                  value={values.email}
                />
                {errors.email && <Text>{errors.email}</Text>}
                <Button disabled={!isValid} onPress={handleSubmit} title='login'/>
              {/* {isValid ? (
                <Button onPress={handleSubmit} type="secondary" label={editable ? 'Батлах' : 'Засах'} />
              ) : (
                <Button onPress={handleSubmit} type="disabled" label="Батлах" />
              )} */}
            </>
          )}
        </Formik>
        <FlashMessage position="top" />
      </ScrollView>
    </SafeAreaView>
  );
}

