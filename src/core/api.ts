import axios from "axios";
import { ICharacter, ICharactersResult } from "../interfaces";

const BASE_URL = "https://5allelwtuk.execute-api.us-east-1.amazonaws.com/dev/";

async function get(route: string, params: any) {
  let query =
    "?" +
    Object.keys(params)
      .map((key) => key + "=" + params[key])
      .join("&");
  return axios.get(BASE_URL + route + query);
}

async function post(route: string, params: Object) {
  return axios.post(BASE_URL + route, params);
}

const api = { get, post };

// Back-end requests
export async function fetchPeople(page = 1) {
  const { data } = await post("graphql", {
    query: `
            query($page: Int) {
                getAllPeople(page: $page) {
                    count
                    total
                    people {
                        id
                        name
                        mass
                        height
                        homeworld
                        gender
                    }
                }
            }
        `,
    variables: { page: page }
  });
  if (data.data.getAllPeople) {
    return data.data.getAllPeople as ICharactersResult;
  } else {
    console.log(data.data);
    return null;
  }
}

export async function fetchPerson(id: string) {
  const { data } = await post("graphql", {
    query: `
            query($id: String!) {
                getPersonById(id: $id) {
                    id, 
                    name, 
                    height, 
                    mass, 
                    gender, 
                    images {
                        url
                        thumbnail
                    },
                    homeworldOb {
                        name
                    }
                }
            }
        `,
    variables: { id: id }
  });
  if (data.data.getPersonById) {
    return data.data.getPersonById as ICharacter;
  } else {
    console.log(data.data);
    return null;
  }
}

export async function searchPerson(name: string) {
  const { data } = await post("graphql", {
    query: `
            query($name: String!) {
                searchPerson(name: $name) {id, name, height, mass, gender, homeworld}
            }
        `,
    variables: { name: name }
  });
  if (data.data.searchPerson) {
    return data.data.searchPerson as ICharacter[];
  } else {
    console.log(data.data);
    return null;
  }
}

export default api;
