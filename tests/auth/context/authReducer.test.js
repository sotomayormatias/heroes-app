import { authReducer } from "../../../src/auth/context/AuthReducer";
import { types } from "../../../src/auth/types/types";

describe('Tests on AuthReducer', () => {
  test('Should return default state', () => {
    const initialState = {
      logged: false,
    };

    const newState = authReducer(initialState, {});
    expect(newState).toBe(initialState);
  });

  test('Should return logged in true and set user on login', () => {
    const initialState = {
      logged: false,
    };

    const action = {
      type: types.login,
      payload: {
        id: 'ABC',
        name: 'Juan',
      },
    }
    const newState = authReducer(initialState, action);
    expect(newState).toEqual({
      logged: true,
      user: action.payload
    });
  });

  test('Should return logged in false and remove user on logout', () => {
    const initialState = {
      logged: true,
      user: {
        id: '123',
        name: 'Mario',
      }
    };

    const action = {
      type: types.logout,
    }
    const newState = authReducer(initialState, action);
    expect(newState).toEqual({
      logged: false,
    });
  });
});
