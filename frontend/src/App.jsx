import { useState } from 'react';
import BottomNav from './components/BottomNav';
import MainLayout from './layout/MainLayout';
import HomeScreen from './screens/HomeScreen';
import AlertScreen from './screens/AlertScreen';
import ReportScreen from './screens/ReportScreen';
import FeedScreen from './screens/FeedScreen';
import ProfileScreen from './screens/ProfileScreen';

const screenMap = {
  home: <HomeScreen />,
  alert: <AlertScreen />,
  report: <ReportScreen />,
  feed: <FeedScreen />,
  profile: <ProfileScreen />
};

function App() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <MainLayout>
      {screenMap[activeTab]}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </MainLayout>
  );
}

export default App;
