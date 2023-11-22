import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  ToastAndroid,
  BackHandler,
  Alert,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Image,
  TextInput,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../constants/Theme';
import {useDispatch, useSelector} from 'react-redux';
import {fetchData} from '../redux/slices/dataSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width} = Dimensions.get('screen');
const cardWidth = width / 2 - 20;

const Home = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {data, status, error} = useSelector(state => state.data);
  // console.log('data', data);

  const openDrawer = () => {
    navigation.openDrawer();
  };
  const myIcon = <Icon name="menu" size={20} color="#000" />;

  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [modal, setModal] = useState(false);
  const toggleProfile = () => [setModal(!modal)];

  const categoriesArray = [
    {
      id: '1',
      name: 'Laundry',
      image: require('../assets/images/serviceCategory/laundry.png'),
    },
    {
      id: '2',
      name: 'Plumbing',
      image: require('../assets/images/serviceCategory/plumbing.png'),
    },
    {
      id: '3',
      name: 'Cleaning',
      image: require('../assets/images/serviceCategory/cleaning.png'),
    },
    {
      id: '4',
      name: 'AC Repair',
      image: require('../assets/images/serviceCategory/acrepair.png'),
    },
    {
      id: '5',
      name: 'Beauty',
      image: require('../assets/images/serviceCategory/beauty.png'),
    },
    {
      id: '6',
      name: 'Painting',
      image: require('../assets/images/serviceCategory/painting.png'),
    },
    {
      id: '7',
      name: 'Electronics',
      image: require('../assets/images/serviceCategory/electronics.png'),
    },
    {
      id: '8',
      name: "Men's Salon",
      image: require('../assets/images/serviceCategory/salon.png'),
    },
    {
      id: '9',
      name: 'Shifting',
      image: require('../assets/images/serviceCategory/shifting.png'),
    },
  ];

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to Exit the App?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    const fetchDataAndSetLoading = async () => {
      setIsLoading(true);
      try {
        await dispatch(fetchData());
      } finally {
        setIsLoading(false);
      }
    };

    fetchDataAndSetLoading();
  }, [dispatch]);

  // Function to delete user session data from AsyncStorage
  const LogoutSession = async () => {
    try {
      await AsyncStorage.removeItem('token');
      setModal(!modal);
      ToastAndroid.show('Logged Out', ToastAndroid.SHORT);
      navigation.navigate('BoardScreen');
    } catch (error) {
      console.error(error);
    }
  };

  const renderItem = ({item}) => (
    <View style={style.categoryItem}>
      <View style={style.imageBorder}>
        <Image source={item.image} style={style.categoryImage} />
      </View>
      <Text style={style.categoryName}>{item.name}</Text>
    </View>
  );

  const Categories = () => {
    return (
      <View>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 600,
            marginLeft: 20,
            marginTop: 10,
            marginBottom: 10,
          }}>
          Categories
        </Text>
        <FlatList
          data={categoriesArray}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={style.categoryListContainer}
        />
      </View>
    );
  };
  const Card = ({serviceProvider}) => {
    return (
      <TouchableOpacity
        underlayColor={colors.white}
        activeOpacity={0.9}
        onPress={() => navigation.navigate('DetailsScreen', serviceProvider)}>
        <View style={style.card}>
          <View style={{alignItems: 'center'}}>
            <Image
              source={{uri: serviceProvider.image}}
              style={{height: 120, width: 120}}
            />
          </View>
          <View style={{marginHorizontal: 20}}>
            <Text
              style={{fontSize: 18, fontWeight: 'bold'}}
              numberOfLines={1}
              ellipsizeMode="tail">
              {serviceProvider.title}
            </Text>
            <Text style={{fontSize: 14, color: colors.grey, marginTop: 2}}>
              {serviceProvider.ingredients}
            </Text>
          </View>
          <View
            style={{
              marginTop: 10,
              marginHorizontal: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              {serviceProvider.firstName}
            </Text>
            <View
              style={{
                width: 56,
                height: 30,
                borderRadius: 15,
                backgroundColor: colors.green,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{color: '#fff', fontWeight: 400, fontSize: 14}}>
                ${serviceProvider.age}/hr
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <View style={style.header}>
        <View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 28}}>Hello,</Text>
            <Text style={{fontSize: 28, fontWeight: 'bold', marginLeft: 10}}>
              Piyush
            </Text>
          </View>
          <Text style={{marginTop: 5, fontSize: 22, color: colors.grey}}>
            What do you want today
          </Text>
        </View>
        <TouchableOpacity onPress={toggleProfile}>
          <Image
            source={require('../assets/images/person.png')}
            style={{height: 50, width: 50, borderRadius: 25}}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginTop: 40,
          flexDirection: 'row',
          paddingHorizontal: 20,
        }}>
        <View style={style.inputContainer}>
          <Icon name="search" size={28} />
          <TextInput
            style={{flex: 1, fontSize: 18}}
            placeholder="Search what you need"
            value={searchText}
            onChangeText={text => setSearchText(text)}
          />
        </View>
        <View style={style.sortBtn}>
          <Icon1 name="tune" size={28} color={colors.white} />
        </View>
      </View>
      <Categories />
      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={data?.users.filter(user =>
          user?.firstName?.toLowerCase().includes(searchText.toLowerCase()),
        )}
        renderItem={({item}) => <Card serviceProvider={item} />}
      />

      {/* Modal for profile  */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        onRequestClose={() => {
          setModal(!modal);
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 35,
            marginVertical: 310,
            backgroundColor: colors.white,
            borderRadius: 20,
            borderColor: colors.primary,
            borderWidth: 2,
            elevation: 5,
          }}>
          <TouchableOpacity onPress={LogoutSession}>
            <Text
              style={{
                fontSize: 20,
                color: colors.white,
                fontWeight: '600',
                backgroundColor: colors.primary,
                height: 40,
                width: 90,
                borderRadius: 30,
                textAlign: 'center',
                paddingVertical: 5,
              }}>
              Log Out
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  inputContainer: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: colors.light,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  sortBtn: {
    width: 50,
    height: 50,
    marginLeft: 10,
    backgroundColor: colors.green,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesListContainer: {
    paddingVertical: 30,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  categoryBtn: {
    height: 45,
    width: 120,
    marginRight: 7,
    borderRadius: 30,
    alignItems: 'center',
    paddingHorizontal: 5,
    flexDirection: 'row',
  },
  categoryBtnImgCon: {
    height: 35,
    width: 35,
    backgroundColor: colors.white,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    height: 220,
    width: cardWidth,
    marginHorizontal: 10,
    marginBottom: 20,
    marginTop: 50,
    borderRadius: 15,
    elevation: 13,
    backgroundColor: colors.white,
  },
  addToCartBtn: {
    height: 30,
    width: 30,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryListContainer: {
    paddingHorizontal: 16,
  },
  categoryItem: {
    marginRight: 16,
    alignItems: 'center',
  },
  imageBorder: {
    borderColor: '#00C6BA',
    borderRadius: 40,
    borderWidth: 0.7,
    padding: 20,
  },
  categoryImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  categoryName: {
    fontSize: 16,
  },
});
export default Home;
