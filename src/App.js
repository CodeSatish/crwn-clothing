
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

import Header from './components/header/header.component'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import {auth,createUserProfileDocument, firestore} from './firebase/firebase.utils';
import {onAuthStateChanged} from 'firebase/auth';
import {doc, onSnapshot} from 'firebase/firestore';
import {setCurrentUser} from './redux/user/user.actions';
import {selectCurrentUser} from './redux/user/user.selector';

class App extends React.Component {

unsubsribeFromAuth = null

componentDidMount(){
  const {setCurrentUser} = this.props;

  this.unsubsribeFromAuth= onAuthStateChanged(auth,async userAuth => {
    if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);

        const unsub = onSnapshot(doc(firestore, `users/${userAuth.uid}` ), (docSnapshot) => {
          setCurrentUser({
              id: docSnapshot.id,
              ...docSnapshot.data()
          });
      });
    }
    
    setCurrentUser(userAuth);
  });
}

componentWillUnmount(){
  this.unsubsribeFromAuth();
}

render(){
  return (
    <div >
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
        <Route exact path='/checkout' component={CheckoutPage} />
        <Route exact path='/signin' render={()=> this.props.currentUser?(<Redirect to='/' />) : (<SignInAndSignUpPage />)} />
      </Switch>
    </div>
  );
}
}

const mapStateToProps= createStructuredSelector ({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps,mapDispatchToProps)(App);
