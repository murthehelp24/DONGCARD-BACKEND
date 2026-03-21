import Card from './Card'
import Filter from './Filter'

function BodyUser() {
  return (
    <div>
      <div className="drawer lg:drawer-open bg-base-200">
        <input id="filter-drawer" type="checkbox" className="drawer-toggle" />

        <main className="drawer-content flex flex-col p-4 ">
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">One Piece Special Offers</h1>
          </header>
          <div className='flex gap-2'>

            <Card />

          </div>
        </main>

        <Filter />
      </div>
    </div>
  )
}

export default BodyUser