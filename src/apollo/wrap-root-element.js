import React from 'react';
import { ApolloProvider } from '@apollo/client';
import ThemeContext, { ThemeProvider } from "../utils/theme";
import { client } from './client';
import "../styles/main.scss";

export const wrapRootElement = ({ element }) => (
  
      <ApolloProvider client={client}>
        <ThemeProvider>
          <ThemeContext.Consumer>
            {({ toString }) => 
              <div className={`theme-${toString()}`}>
                {element}
              </div>}
          </ThemeContext.Consumer>
        </ThemeProvider>
      </ApolloProvider>
    
);
