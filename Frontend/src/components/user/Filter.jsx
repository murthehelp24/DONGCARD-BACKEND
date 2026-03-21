import React from 'react'

function Filter() {
  return (
    <div>
      <div class="p-6 bg-base-200 w-80 min-h-screen flex flex-col gap-2 text-base-content">

        <section>
          <div class="form-control w-full mb-6">
            <label class="label"><span class="label-text font-semibold">Price Range</span></label>
            <input type="range" min="0" max="1000" class="range range-primary range-xs" />
          </div>
          <div class="flex justify-between mt-4 gap-2">
            <div class="form-control w-full">
              <label class="label"><span class="label-text-alt">From</span></label>
              <input type="text" placeholder="$ 0" class="input input-bordered input-sm w-full text-center" />
            </div>
            <div class="form-control w-full">
              <label class="label"><span class="label-text-alt">To</span></label>
              <input type="text" placeholder="$ 1000" class="input input-bordered input-sm w-full text-center" />
            </div>
          </div>
        </section>

        <div class="divider my-0"></div>

        <section>
          <h3 class="font-bold text-lg mb-3 text-primary">Rarity</h3>
          <div class="flex flex-col gap-2">
            <label class="label cursor-pointer justify-start gap-3 p-0 ">
              <input type="checkbox" class="checkbox checkbox-sm checkbox-primary" />
              <span class="label-text">Common</span>
            </label>
            <label class="label cursor-pointer justify-start gap-3 p-0 ">
              <input type="checkbox" class="checkbox checkbox-sm checkbox-primary" />
              <span class="label-text">Uncommon</span>
            </label>
            <label class="label cursor-pointer justify-start gap-3 p-0 ">
              <input type="checkbox" class="checkbox checkbox-sm checkbox-primary" />
              <span class="label-text">Rare</span>
            </label>
            <label class="label cursor-pointer justify-start gap-3 p-0 ">
              <input type="checkbox" class="checkbox checkbox-sm checkbox-primary" />
              <span class="label-text">Leader</span>
            </label>
            <label class="label cursor-pointer justify-start gap-3 p-0 ">
              <input type="checkbox" class="checkbox checkbox-sm checkbox-primary" />
              <span class="label-text">Super Rare</span>
            </label>
            <label class="label cursor-pointer justify-start gap-3 p-0 ">
              <input type="checkbox" class="checkbox checkbox-sm checkbox-primary" />
              <span class="label-text">Secret Rear</span>
            </label>
            <label class="label cursor-pointer justify-start gap-3 p-0 ">
              <input type="checkbox" class="checkbox checkbox-sm checkbox-primary" />
              <span class="label-text">Special Rare</span>
            </label>
          </div>
        </section>

        <div class="divider my-0"></div>

        <section>
          <h3 class="font-bold text-lg mb-3 text-primary">Color</h3>
          <div class="grid grid-cols-1 gap-2">
            <label class="label cursor-pointer justify-start gap-3 p-0 ">
              <input type="checkbox" class="checkbox checkbox-sm checkbox-primary" />
              <span class="label-text">Red</span>
            </label>
            <label class="label cursor-pointer justify-start gap-3 p-0 ">
              <input type="checkbox" class="checkbox checkbox-sm checkbox-primary" />
              <span class="label-text">Green</span>
            </label>
            <label class="label cursor-pointer justify-start gap-3 p-0 ">
              <input type="checkbox" class="checkbox checkbox-sm checkbox-primary" />
              <span class="label-text">Blue</span>
            </label>
            <label class="label cursor-pointer justify-start gap-3 p-0 ">
              <input type="checkbox" class="checkbox checkbox-sm checkbox-primary" />
              <span class="label-text">Purple</span>
            </label>
            <label class="label cursor-pointer justify-start gap-3 p-0 ">
              <input type="checkbox" class="checkbox checkbox-sm checkbox-primary" />
              <span class="label-text">Black</span>
            </label>
            <label class="label cursor-pointer justify-start gap-3 p-0 ">
              <input type="checkbox" class="checkbox checkbox-sm checkbox-primary" />
              <span class="label-text">Yellow</span>
            </label>
          </div>
        </section>

        <div class="divider my-0"></div>

        <section>
          <h3 class="font-bold text-lg mb-3 text-primary">Illustration/Art Variant</h3>
          <div class="flex flex-col gap-2">
            <label class="label cursor-pointer justify-start gap-3 p-0">
              <input type="checkbox" class="checkbox checkbox-sm checkbox-primary" />
              <span class="label-text">Standard Art</span>
            </label>
            <label class="label cursor-pointer justify-start gap-3 p-0">
              <input type="checkbox" class="checkbox checkbox-sm checkbox-primary" />
              <span class="label-text">Alternate Art (AA) / Parallel</span>
            </label>
          </div>
        </section>

        <div class="divider my-0"></div>

        <button class="btn btn-primary btn-block ">Apply Filters</button>
        <button class="btn btn-outline btn-error btn-block">Reset Filter</button>
      </div>

    </div>

  )
}

export default Filter