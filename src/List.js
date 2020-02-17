import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Image,
  Text,
  Platform,
} from 'react-native';
import {Card, SearchBar, ListItem} from 'react-native-elements';

class FlatListDemo extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      error: null,
    };

    this.arrayholder = [];
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=f75645adf68888516cbb5e748e84155a`;
    this.setState({loading: true});

    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: res.results,
          error: res.error || null,
          loading: false,
        });
        this.arrayholder = res.results;
      })
      .catch(error => {
        this.setState({error, loading: false});
      });
  };

  searchFilterFunction = text => {
    this.setState({
      value: text,
    });

    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.title.toUpperCase()}`;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData,
    });
  };

  renderHeader = () => {
    return (
      <SearchBar
        placeholder="Search"
        lightTheme
        round
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
        value={this.state.value}
      />
    );
  };
  _onPress(item) {
    this.props.navigation.navigate('Details', {
      image: item.poster_path,
      date: item.release_date,
      title: item.title,
      language: item.original_language,
      overview: item.overview,
    });
  }

  renderItem = ({item}) => {
    return (
      <TouchableOpacity onPress={() => this._onPress(item)}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            margin: 1,
            width: Platform.OS === 'ios' ? 185 : 200,
          }}>
          <Card>
            <Image
              style={{
                height: 200,
                width: Platform.OS === 'ios' ? 120 : 140,
              }}
              source={{uri: item.poster_path}}></Image>
            <Text>{item.title}</Text>
            <Text>{item.release_date}</Text>
          </Card>
        </View>
      </TouchableOpacity>
    );
  };
  render() {
    if (this.state.loading) {
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View
        style={{
          marginTop: Platform.OS === 'ios' ? '12%' : 0,
          marginBottom: Platform.OS === 'ios' ? '-5%' : '2%',
        }}>
        <FlatList
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
          ListHeaderComponent={this.renderHeader}
          numColumns={2}
        />
      </View>
    );
  }
}

export default FlatListDemo;
