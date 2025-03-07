import { UserDataProvider } from './hooks/UserDataContext';
import Navigation from './components/Navigation';

export default function App() {
  return (
    <UserDataProvider>
      <Navigation/>
    </UserDataProvider>
  );
}
