import Link from 'next/link'
import { Container, CustomHeader } from './styles'

export function Header() {
    return (
        <CustomHeader>
            <Container>
                <ul className="menu">
                    <li className="repository">
                        <Link href="https://github.com/DanielSPereira/Rick_And_Morty_Universe" target="_blank">
                            <a>Repository</a>
                        </Link>
                    </li>
                    <li className="reference">
                        <Link href="https://rickandmortyapi.com/" target="_blank">
                            <a>Reference</a>
                        </Link>
                    </li>
                </ul>

                <h1 className="site-title">The Rick and Morty <br /> Universe</h1>
            </Container>
        </CustomHeader>
    )
}