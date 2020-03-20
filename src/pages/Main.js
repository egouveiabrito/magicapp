import React from 'react';

import { Dimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';

import Search from '../pages/Search';
import MyDeck from '../pages/MyDeck';


const SearchScreen = () => (
 <Search></Search>
);

const MyDeckScreen = () => (
  <MyDeck></MyDeck>
);

const initialLayout = { width: Dimensions.get('window').width };

export default function Main() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Search' },
    { key: 'second', title: 'My Deck' },
  ]);

  const renderScene = SceneMap({
    first: SearchScreen,
    second: MyDeckScreen,
  });

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
    />
  );
}
