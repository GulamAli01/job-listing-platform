import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSearchQuery } from '@/redux/jobSlice'

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "Fullstack Developer"
]

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = (query) => {
        dispatch(setSearchQuery(query));
        navigate("/browse");
    }

    return (
        <div className="w-full px-4 md:px-10 my-10">
            <Carousel className="w-full max-w-5xl mx-auto">
                <CarouselContent className="gap-3">

                    {
                        category.map((cat, idx) => (
                            <CarouselItem 
                                key={idx}
                                className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
                            >
                                <Button 
                                    onClick={() => searchJobHandler(cat)} 
                                    variant='outline' 
                                    className="w-full rounded-full text-sm md:text-base"
                                >
                                    {cat}
                                </Button>
                            </CarouselItem>
                        ))
                    }

                </CarouselContent>

                <CarouselPrevious className="hidden md:flex"/>
                <CarouselNext className="hidden md:flex"/>

            </Carousel>
        </div>
    )
}

export default CategoryCarousel