import "./styles.css"

export function CharacterCard({ handleOpenModal }: { handleOpenModal: () => void }) {
    return (
        <div className="card box-shadow">
            <img src="https://images5.alphacoders.com/796/796108.jpg" alt="" />
            <div className="w-full h-full p-4">
                <h1 className="character-name">Summer Smith</h1>

                <span className="block">
                    <span className="status-circle"></span>
                    <p className="status-specie">Alive - Human</p>
                </span>
                
                <span className="block mt-3">
                    <span className="sub-title">Last known location:</span>
                    <p className="answer">Earth &#40;Replacement Dimension&#41;</p>
                </span>

                <span className="block mt-3">
                    <span className="sub-title">First seen in:</span>
                    <p className="answer">Mortynight Run</p>
                </span>

                <button 
                    type="button" 
                    className="view-details" 
                    onClick={handleOpenModal}
                >
                    View Details
                </button>
            </div>
        </div>
    )
}