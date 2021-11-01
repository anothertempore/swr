import Link from 'next/link'

import useSWR from 'swr'

let count = 0

const fetcher = url => {
  console.log(count)
  if (++count <= 2) return 'data'
  throw new Error('error')
}

export default function Index() {
  const { data, error, mutate } = useSWR(
    'https://api.github.com/repos/vercel/swr',
    fetcher,
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false
    }
  )

  console.log({ data, error })

  return (
    <div>
      {error ? `${error.message}` : data}
      <div>
        <button onClick={() => mutate()}>mutate</button>
      </div>
    </div>
  )
}
