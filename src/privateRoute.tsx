import React from 'react'
import validateUser from './controllers/validateUser'
import { Route, Redirect } from 'react-router-dom'

export const PrivateRoute: React.FC = ({ children, ...rest }) => {
    return (
        <Route
          {...rest}
          render={({ location }) =>
            validateUser() ? (
              children
            ) : (
              <Redirect
                to={{
                  pathname: "/",
                  state: { from: location }
                }}
              />
            )
          }
        />
      );
}
