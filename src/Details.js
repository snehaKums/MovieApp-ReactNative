import React, {Component} from 'react';
import {Text, BackHandler, View, Image} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

export default class Details extends Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  componentDidMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }
  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }
  handleBackButtonClick() {
    alert('You clicked back. Now Screen will move to ThirdPage');
    this.props.navigation.navigate('ThirdPage');
    return true;
  }
  static navigationOptions = {
    title: 'Details',
  };
  render() {
    const {navigation} = this.props;
    const image = navigation.getParam('image', 'NO-image');
    const date = navigation.getParam('date', 'NO-Date');
    const title = navigation.getParam('title', 'no title');
    const language = navigation.getParam('language', 'no language');
    const overview = navigation.getParam('overview', 'no overview');

    return (
      <View style={{flex: 1}}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '-6%',
            marginTop: Platform.OS === 'ios' ? '-25%' : '-10%',
          }}>
          <Image
            style={{
              height: Platform.OS === 'ios' ? '60%%' : '70%',
              width: '90%',
              borderWidth: 1,
              borderColor: 'black',
            }}
            source={image}></Image>
        </View>
        <Text style={{padding: 2}}>Movie Title:{JSON.stringify(title)}</Text>
        <Text style={{padding: 2}}>Year of release:{JSON.stringify(date)}</Text>
        <Text style={{padding: 2}}>Language:{JSON.stringify(language)}</Text>
        <Text style={{paddingLeft: 2}}>
          Description:{JSON.stringify(overview)}
        </Text>
      </View>
    );
  }
}
