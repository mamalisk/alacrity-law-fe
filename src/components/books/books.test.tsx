import * as React from 'react';
import { MockedProvider, MockedProviderProps, MockedProviderState } from '@apollo/react-testing';
import { QUERY_BOOKS } from './query';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BooksContainer } from '.';
configure({ adapter: new Adapter() });

export const MockQueryProvider = (inner: React.ReactElement<any>): React.ReactElement<any> => {
    return (
      <MockedProvider
        mocks={[
          {
            request: { query: QUERY_BOOKS },
            result: {
              data: { books: 
                [
                    { bookId: 1, title: 'a', author: 'a', price: 1.1 },
                    { bookId: 2, title: 'b', author: 'c', price: 1.1 }

                ]
             },
            }
          }
        ]}
        addTypename={false}
      >
        {inner}
      </MockedProvider>
    );
  };

describe('BookContainer', () => {
    it('should render successfully', () => {
        const history = {
            push: (s: string) => {},
        };
        const wrapper = mount(
            <MockedProvider>
                <BooksContainer history={history}/>
            </MockedProvider>
        );
        expect(wrapper).toBeTruthy();
    });
})

