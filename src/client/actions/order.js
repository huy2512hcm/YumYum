import { ADD_TO_ORDER, SET_ORDER, CREATE_ORDER, CLEAR_ORDER } from "./types";
import { setAlert } from "./alert";
import { createOrderRequest } from "../request/order";

export const setOrder = () => async (dispatch, getState) => {
  let orders = getState().group.dishes;
  orders = orders.map((dish) => {
    return { ...dish, quantity: 0 };
  });
  dispatch({ type: SET_ORDER, payload: orders });
};

export const addToOrder = (dishId, isAdding) => async (dispatch, getState) => {
  const dishes = getState().order.dishes;
  let updatedDish = dishes.find((dish) => dish._id == dishId);
  if (isAdding) {
    updatedDish.quantity = updatedDish.quantity + 1;
  } else {
    if (updatedDish.quantity <= 0) {
      return;
    }
    updatedDish.quantity = updatedDish.quantity - 1;
  }
  dispatch({ type: ADD_TO_ORDER, payload: { ...updatedDish } });
};

export const createOrder = (groupId) => async (dispatch, getState) => {
  const order = getState().order;
  const dishArray = order.dishes.filter((dish) => dish.quantity > 0);
  if (dishArray.length == 0) {
    dispatch(setAlert("danger", "No dish is ordered"));
    return -1;
  }
  const createOrderResult = await createOrderRequest(
    groupId,
    dishArray,
    order.totalPrice
  );
  if (!createOrderResult.status) {
    dispatch(setAlert("danger", createOrderResult.message));
    return -1;
  }
  let dishes = getState().group.dishes;
  dishes = dishes.map((dish) => {
    return { ...dish, quantity: 0 };
  });
  dispatch({ type: CREATE_ORDER, payload: dishes });
  dispatch(setAlert("success", "Order Successfully"));
};

export const clearOrder = () => (dispatch) => {
  dispatch({ type: CLEAR_ORDER });
};
