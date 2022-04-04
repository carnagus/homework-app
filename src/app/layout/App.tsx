import React from 'react';
import { Container } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { Route, Switch, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../features/errors/NotFound';
import ReviewForm from '../../features/reviews/form/ReviewForm';
import ReviewsDashboard from '../../features/reviews/dasboard/ReviewsDashboard';
import NavBar from './Navbar';

function App() {
  const location = useLocation();

  return (
    <>
      <ToastContainer position='bottom-right' hideProgressBar />
      <Route exact path='/' component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <>
            <NavBar />
            <Container style={{ marginTop: '7em' }}>
              <Switch>
                <Route exact path='/reviews' component={ReviewsDashboard}/>
                <Route key={location.key} path='/createReview' component={ReviewForm} />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </>
        )}
      />
    </>
  );
}

export default observer(App);
