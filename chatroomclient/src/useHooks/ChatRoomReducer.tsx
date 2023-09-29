import { ACTIONS } from "../constants/ACTIONS";
import { ROLES } from "../constants/ROLES";

export const reducer = (state: any, action: any) => {
  switch (action.type) {
    case ACTIONS.LOGIN: {
      const user = action.payload;
      return {
        ...state,
        user: user,
        showUser: user.roles.includes(ROLES.ROLE_USER),
        showAdmin: user.roles.includes(ROLES.ROLE_ADMIN),
      };
    }
    case ACTIONS.LOGOUT: {
      return { ...state, user: {}, showUser: false, showAdmin: false};
    }
  }
};
