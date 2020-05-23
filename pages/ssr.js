import Layout from '../components/layout'
import Head from 'next/head'
import utilStyles from '../styles/utils.module.css'

import JSONPretty from 'react-json-pretty'
import JSONPrettyMon from 'react-json-pretty/dist/monikai'

import useSWR, { mutate } from 'swr'
import React from 'react'

import fetcher from '../utils/fetcher'

export default function Post({ ssrData }) {
    const { data } = useSWR("/api/hello", fetcher);
    
    if (!data) return <h1>Loading...</h1>;

    return (
        <Layout>
            <Head>
                <title>SSR</title>
            </Head>
            <article>
                <p>This page is rendered server-side.</p>
                <div>
                    <div className={utilStyles.lightText}>
                        Timezone API: &nbsp;
                        <a href="https://worldtimeapi.org/api/timezone/Asia/Kolkata" target="_blank">
                            https://worldtimeapi.org/api/timezone/Asia/Kolkata
                        </a>
                    </div>

                    <div>
                        Timezone API Response:
                        <br />
                        <JSONPretty theme={JSONPrettyMon} data={ssrData}></JSONPretty>
                    </div>

                    <div>
                        Client side API response
                            <br />
                        <button onClick={async () => {
                            // mutate('/api/hello', {  })
                        }}>
                            CLICK ME!
                            </button>

                        <JSONPretty theme={JSONPrettyMon} data={data}></JSONPretty>
                    </div>
                </div>
            </article>
        </Layout>
    )
}

// This gets called on every request
export async function getServerSideProps() {
    // Fetch data from external API
    const res = await fetch(`https://worldtimeapi.org/api/timezone/Asia/Kolkata`)
    const ssrData = JSON.stringify(await res.json())

    // Pass data to the page via props
    return { props: { ssrData } }
}
