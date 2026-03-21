import React from 'react'

function Filter() {
  return (
    <div>
      <div className="p-6 bg-base-200 w-80 min-h-screen flex flex-col gap-2 text-base-content">

        <section>
          <div className="form-control w-full mb-6">
            <label className="label"><span className="label-text font-semibold">Price Range</span></label>
            <input type="range" min="0" max="1000" className="range range-primary range-xs" />
          </div>
          <div className="flex justify-between mt-4 gap-2">
            <div className="form-control w-full">
              <label className="label"><span className="label-text-alt">From</span></label>
              <input type="text" placeholder="$ 0" className="input input-bordered input-sm w-full text-center" />
            </div>
            <div className="form-control w-full">
              <label className="label"><span className="label-text-alt">To</span></label>
              <input type="text" placeholder="$ 1000" className="input input-bordered input-sm w-full text-center" />
            </div>
          </div>
        </section>

        <div className="divider my-0"></div>

        <section>
          <h3 className="font-bold text-lg mb-3 text-primary">Rarity</h3>
          <div className="flex flex-col gap-2">
            <label className="label cursor-pointer justify-start gap-3 p-0 ">
              <input type="checkbox" className="checkbox checkbox-sm checkbox-primary" />
              <span className="label-text">C</span>
            </label>
            <label className="label cursor-pointer justify-start gap-3 p-0 ">
              <input type="checkbox" className="checkbox checkbox-sm checkbox-primary" />
              <span className="label-text">UC</span>
            </label>
            <label className="label cursor-pointer justify-start gap-3 p-0 ">
              <input type="checkbox" className="checkbox checkbox-sm checkbox-primary" />
              <span className="label-text">R</span>
            </label>
            <label className="label cursor-pointer justify-start gap-3 p-0 ">
              <input type="checkbox" className="checkbox checkbox-sm checkbox-primary" />
              <span className="label-text">L</span>
            </label>
            <label className="label cursor-pointer justify-start gap-3 p-0 ">
              <input type="checkbox" className="checkbox checkbox-sm checkbox-primary" />
              <span className="label-text">SR</span>
            </label>
            <label className="label cursor-pointer justify-start gap-3 p-0 ">
              <input type="checkbox" className="checkbox checkbox-sm checkbox-primary" />
              <span className="label-text">SEC</span>
            </label>
            <label className="label cursor-pointer justify-start gap-3 p-0 ">
              <input type="checkbox" className="checkbox checkbox-sm checkbox-primary" />
              <span className="label-text">SP CARD</span>
            </label>
          </div>
        </section>

        <div className="divider my-0"></div>

        <section>
          <h3 className="font-bold text-lg mb-3 text-primary">Color</h3>
          <div className="grid grid-cols-1 gap-2">
            <label className="label cursor-pointer justify-start gap-3 p-0 ">
              <input type="checkbox" className="checkbox checkbox-sm checkbox-primary" />
              <span className="label-text">Red</span>
            </label>
            <label className="label cursor-pointer justify-start gap-3 p-0 ">
              <input type="checkbox" className="checkbox checkbox-sm checkbox-primary" />
              <span className="label-text">Green</span>
            </label>
            <label className="label cursor-pointer justify-start gap-3 p-0 ">
              <input type="checkbox" className="checkbox checkbox-sm checkbox-primary" />
              <span className="label-text">Blue</span>
            </label>
            <label className="label cursor-pointer justify-start gap-3 p-0 ">
              <input type="checkbox" className="checkbox checkbox-sm checkbox-primary" />
              <span className="label-text">Purple</span>
            </label>
            <label className="label cursor-pointer justify-start gap-3 p-0 ">
              <input type="checkbox" className="checkbox checkbox-sm checkbox-primary" />
              <span className="label-text">Black</span>
            </label>
            <label className="label cursor-pointer justify-start gap-3 p-0 ">
              <input type="checkbox" className="checkbox checkbox-sm checkbox-primary" />
              <span className="label-text">Yellow</span>
            </label>
          </div>
        </section>

        <div className="divider my-0"></div>

        <section>
          <h3 className="font-bold text-lg mb-3 text-primary">Illustration/Art Variant</h3>
          <div className="flex flex-col gap-2">
            <label className="label cursor-pointer justify-start gap-3 p-0">
              <input type="checkbox" className="checkbox checkbox-sm checkbox-primary" />
              <span className="label-text">Standard Art</span>
            </label>
            <label className="label cursor-pointer justify-start gap-3 p-0">
              <input type="checkbox" className="checkbox checkbox-sm checkbox-primary" />
              <span className="label-text">Alternate Art (AA) / Parallel</span>
            </label>
          </div>
        </section>

        <div className="divider my-0"></div>

        <button className="btn btn-primary btn-block ">Apply Filters</button>
        <button className="btn btn-outline btn-error btn-block">Reset Filter</button>
      </div>

    </div>

  )
}

export default Filter