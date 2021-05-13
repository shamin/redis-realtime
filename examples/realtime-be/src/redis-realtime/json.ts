import { getJson, setJson } from './redis'

const my_json_key = 'my_json'

setJson(my_json_key, '.', '{"test":1234}').then(() => {
  console.log('Set JSON at key ' + my_json_key + '.')
  getJson(my_json_key, '.test').then((d: any) => {
    console.log('Data from json', d)
  })
})
