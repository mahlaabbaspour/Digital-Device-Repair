// import { api } from '../api'

// export async function fetchOptionsSelect(url: string, search: string) {
//   try {
//     const response = await api.get(url, {
//       params: { search }
//     })

//     const data = response.data?.data

//     return data
//   } catch (error) {
//     throw error
//   }
// }

const fakeProducts = [
  { id: 1, name: 'باتری' },
  { id: 2, name: 'صفحه نمایش' },
  { id: 3, name: 'شارژر' },
  { id: 4, name: 'قاب' }
]

const fakeServices = [
  { id: 10, name: 'تعویض باتری' },
  { id: 11, name: 'تعمیر صفحه نمایش' },
  { id: 12, name: 'تعمیر برد' },
  { id: 13, name: 'نصب نرم افزار' }
]

export async function fetchOptionsSelect(url: string, search: string) {
  await new Promise(resolve => setTimeout(resolve, 500))

  const data = url.includes('type=1') ? fakeProducts : fakeServices

  return data.filter(item => item.name.includes(search))
}
