import {useEffect} from 'react'
import './App.css';
import { BrowserRouter as Router,Switch,Route, Redirect } from 'react-router-dom';
import {setInitialState} from "./apicalls"
import { Landing } from './views/landing';
import { Navigation } from './components/navigation';
import { FoodEntries } from './views/foodEntries';
import { MealPlan } from './views/mealPlan';
import { ToastContainer } from 'react-toastify';
import {Container} from 'react-bootstrap'
import {InviteFriend} from "./components/inviteFriend"
import { UsersFoodEntried } from './views/admin/usersFoodEntries';
import { UsersReport } from './views/admin/usersReport';
import { UsersList } from './views/admin/listUser';

function App() {

  //loading initial state for app to run. only for demo purpose
  useEffect(() => {
    setInitialState()
  }, [])

  return (
    <>
      <Router>
        <Navigation />
        <ToastContainer />
        <Container>
        <InviteFriend></InviteFriend>
        <Switch>
          <Route path="/landing" exact component={Landing} />
          <Route path="/food-entries" exact component={FoodEntries} />
          <Route path="/meal-plan" exact component={MealPlan} />
          <Route path="/admin/users" exact component={UsersList} />
          <Route path="/admin/users/:userId" exact component={UsersFoodEntried} />
          <Route path="/admin/users-report" exact component={UsersReport} />

          {/* add redirect for first page */}
          <Redirect from="*" to="/food-entries" />
        </Switch>
        </Container>
      </Router>
    </>
  );
}

export default App;
