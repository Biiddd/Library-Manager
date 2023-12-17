import Image from 'next/image'
import {Button} from 'antd';
import {Inter} from 'next/font/google'
import {inspect} from "util";

const inter = Inter({subsets: ['latin']})

export default function Home() {
    return (
        <>
            <title>test</title>
            <main>
                <Button>button</Button>
            </main>
        </>
    );
}
