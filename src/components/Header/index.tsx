import './styles.css'

export function Header() {
    return (
        <section className="header">
            <div className="container-content">
                <ul className="menu">
                    <li className="repository">
                        <a href="#">Repository</a>
                    </li>
                    <li className="reference">
                        <a href="#">Reference</a>
                    </li>
                </ul>

                <h1 className="site-title">The Rick and Morty <br /> Universe</h1>
            </div>
        </section>
    )
}