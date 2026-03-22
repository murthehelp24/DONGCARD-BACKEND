import React from 'react'

function Filter(props) {
  const { filters, setFilters } = props

  const hdlCheckboxChange = (category, value) => {
    setFilters(prev => {
      const currentList = prev[category]
      const newList = currentList.includes(value)
        ? currentList.filter(item => item !== value)
        : [...currentList, value];
      return { ...prev, [category]: newList }
    })
  }
  return (
    <div>
      <div className="p-6 bg-base-200 w-60 min-h-screen flex flex-col gap-2 text-base-content pr-0">

        <section>
          <div className="form-control w-full mb-6">
            <label className="label"><span className="label-text font-semibold">Price Range :$ {filters.price}</span></label>
            <input
              type="range" min="0" max="5000"
              className="range range-primary range-xs"
              value={filters.price}
              onChange={(e) => setFilters({ ...filters, price: e.target.value })}
            />
          </div>
          <div className="flex justify-between mt-4 gap-2">
            <div className="form-control w-full">
              <label className="label"><span className="label-text-alt">From</span></label>
              <input type="text" placeholder="$ 0" className="input input-bordered input-sm w-full text-center" />
            </div>
            <div className="form-control w-full">
              <label className="label"><span className="label-text-alt">To</span></label>
              <input type="text"  placeholder="$ 5000" className="input input-bordered input-sm w-full text-center" />
            </div>
          </div>
        </section>

        <div className="divider my-0"></div>

        <section>
          <h3 className="font-bold text-lg mb-3 text-primary">Rarity</h3>
          {['C', 'UC', 'R', 'L', 'SR', 'SEC', 'SP CARD'].map(item => (
            <label key={item} className="label cursor-pointer flex gap-3 p-0 mb-2">
              <input
                type="checkbox"
                className="checkbox checkbox-sm checkbox-primary"
                checked={filters.rarity.includes(item)}
                onChange={() => hdlCheckboxChange('rarity', item)}
              />
              <span className="label-text">{item}</span>
            </label>
          ))}
        </section>

        <div className="divider my-0"></div>

        <section>
          <h3 className="font-bold text-lg mb-3 text-primary">Color</h3>
          {['Red', 'Green', 'Blue', 'Purple', 'Black', 'Yellow'].map(item => (
            <label key={item} className="label cursor-pointer flex gap-3 p-0 mb-2">
              <input
                type="checkbox"
                className="checkbox checkbox-sm checkbox-primary"
                checked={filters.color.includes(item)}
                onChange={() => hdlCheckboxChange('color', item)}
              />
              <span className="label-text">{item}</span>
            </label>
          ))}
        </section>

        <div className="divider my-0"></div>


        <button className="btn btn-outline btn-error btn-block"
          onClick={() => setFilters({ price: 5000, rarity: [], color: [] })}

        >
          Reset Filter</button>
      </div>

    </div>

  )
}

export default Filter