import { randEmail, randFullName, randZipCode, randAddress, randCompanyName, randJobTitle } from '@ngneat/falso'
import * as fs from 'node:fs/promises'
const records: Array<{
  email: string
  fullName: string
  zip: string
  address: string
  company: string
  companyRole: string
}> = []
for (const i of Array(2000).fill(0)) {
  records.push({
    email: randEmail(),
    fullName: randFullName(),
    zip: randZipCode(),
    address: `${ randAddress().street }, ${ randAddress().city }`,
    company: randCompanyName(),
    companyRole: randJobTitle(),
  })
}
await fs.writeFile('dummy-data.json', JSON.stringify(records), 'utf8')
