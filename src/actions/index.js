import _ from 'lodash';
import jsonPlaceholder from '../apis/jsonPlaceholder'

export const fetchPostsAndUsers = () =>  async (dispatch, getState) =>{
  await dispatch(fetchPosts());

  // const userIds = _.uniq(_.map(getState().posts, 'userId'))
  // userIds.forEach(id => dispatch(fetchUser(id)));

  //Refatoração de userIds usando chain
  //Encadeia os comandos
  _.chain(getState().posts)
  //Mapeia o resultado de get state e retorna apenas os valores de userId
    .map('userId')
    //Pega o resultado de map e retorna valores unicos
    .uniq()
    //Itera sobre o id retornado pelo metodo uniq() e chama a função fetchUser(id)
    .forEach(id => dispatch(fetchUser(id)))
    .value()
};

export const fetchPosts = () => async dispatch => {
  const response = await jsonPlaceholder.get('/posts');

  dispatch({ type:'FETCH_POST', payload: response.data })
};

export const fetchUser = (id) =>  async dispatch => {
  const response = await jsonPlaceholder.get(`/users/${id}`)
  dispatch({ type:'FETCH_USER', payload: response.data})
};

// export const fetchUser = (id) =>  dispatch => _fetchUser(id, dispatch);
// //Memoize faz UMA requisição e salva o retorno da mesma, e caso seja chamada 
// //novamente com o mesmo parametro, impede que a requisição seja feita e retorna apenas 
// //o valor da requisição
// const _fetchUser =  _.memoize(async (id, dispatch) => {
//   const response = await jsonPlaceholder.get(`/users/${id}`)

//   dispatch({ type:'FETCH_USER', payload: response.data})
// });