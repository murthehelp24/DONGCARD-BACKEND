import React from 'react'

const Card = () => {
  return (
    <div>{/* card */}
          <div class="card card-side bg-base-100 shadow-xl border border-base-300 overflow-hidden w-95">

            <figure class="bg-base-200/50 p-3">
              <img
                src="https://res.cloudinary.com/dlqrcjic8/image/upload/v1773843033/may4ypvhlhpj5vs9hqlm.png"
                alt="Card Image"
                class="h-full object-cover w-50"
              />
            </figure>

            <div class="card-body flex-1 flex flex-col justify-between p-3 bg-base-200/50 pl-0">
              <div className='border border-gray-600 p-2  rounded-lg h-full '>
                <div class="flex flex-col gap-1">
                <h2 class="card-title text-2xl font-bold border-b-2 border-primary pb-1 inline-block w-fit">
                  Rally
                </h2>
                <div class="mt-4 space-y-1 font-mono text-sm opacity-80">
                  <p>OP12-003</p>
                  <p>UC</p>
                  <p>CHARACTER</p>
                </div>
              </div>

              <div class="flex flex-col gap-4 mt-8">
                <div class="text-xl font-bold text-secondary-focus mt-6">
                  Price: <span class="text-2xl">1$</span>
                </div>
              </div>
              </div>

                <div class="card-actions">
                  <button class="btn btn-primary btn-block shadow-lg">
                    Add To Cart
                  </button>
                </div>
            </div>
          </div></div>
  )
}

export default Card