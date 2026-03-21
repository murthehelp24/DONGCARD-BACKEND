import React from 'react'
import Card from './Card'
import Filter from './Filter'

function BodyUser() {
  return (
    <div>
      <div class="drawer lg:drawer-open bg-base-200">
        <input id="filter-drawer" type="checkbox" class="drawer-toggle" />

        <main class="drawer-content flex flex-col p-4 ">
          <header class="flex justify-between items-center mb-8">
            <h1 class="text-3xl font-bold">One Piece Special Offers</h1>
            <label for="filter-drawer" class="btn btn-primary drawer-button lg:hidden">ตัวกรอง</label>
          </header>

          <div className='flex gap-2'>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
          </div>
          <div className='flex gap-2'>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
          </div>
          <div className='flex gap-2'>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
          </div>

          <div class="join self-center mt-10">
            <button class="join-item btn">«</button>
            <button class="join-item btn btn-active">1</button>
            <button class="join-item btn">2</button>
            <button class="join-item btn">»</button>
          </div>
        </main>


        <Filter/>

      </div>

    </div>
  )
}

export default BodyUser