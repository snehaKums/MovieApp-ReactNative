import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import List from './List';
import Details from './Details';
const AppNavigator = createStackNavigator(
  {
    List: {
      screen: List,
    },
    Details: {
      screen: Details,
    },
  },
  {
    initialRouteName: 'List',
  },
);

export default createAppContainer(AppNavigator);
