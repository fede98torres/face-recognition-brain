import React from 'react';

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: '',
      signInPassword: ''
    }
  }

  onEmailChange = (event) => {
    this.setState({signInEmail: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({signInPassword: event.target.value})
  }

  onSubmitSignIn = () => { //with our REACT app, in order to communicate with the backend or the outside world, we can use fetch.
    fetch('http://localhost:3000/signin', { //fetch by default does a get request, but what we want to do here is a post request, as we remember. So the way we do that is in the second parameter, we can pass an object here that describes what the request will be. In our case, we will have a method of post, headers, etc.
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ //in order to send it to the back end, we can't just send a JavaScript object. We have to JSON.stringify the object 
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
    .then(response => response.json())
    .then(user => {
      if (user.id) {
        this.props.loadUser(user)
        this.props.onRouteChange('home');
      }
    })
}

  render() {
    const { onRouteChange } = this.props;
    return ( //https://tachyons.io/components/forms/sign-in/index.html , el formato de sign in //https://tachyons.io/components/cards/product-card/index.html , the first line of the link (the article tag)
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center"> 
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={this.onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.onPasswordChange}
                />
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={this.onSubmitSignIn}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
              />
            </div>
            <div className="lh-copy mt3">
              <p  onClick={() => onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Signin;
/*
this component has two inputs, the email and the password that when we click sign in, we will
have to send through request body.
We will have to send that to the server, the server is going to check if the user exists and then give
us a response.
*/