import React, {useContext} from 'react';

import {SafeAreaView, Text} from 'react-native';
import {I18nextProvider} from 'react-i18next';
import ContextProvider, { MealContext } from './src/Context/ContextProvider';
import MainContainer from './src/Navigation/MainContainer';
import i18n from './src/Translation/i18n';

function App() {
  
 
  return (
    <ContextProvider>
      <I18nextProvider i18n={i18n}>
        <MainContainer />
      </I18nextProvider>
    </ContextProvider>
  );
}

export default App;
