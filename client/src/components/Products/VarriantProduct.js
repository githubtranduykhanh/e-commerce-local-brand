import React, { memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { InputFrom, Loading } from "..";
import { toBase64 } from "../../ultils/helpers";
import { IoMdClose } from "react-icons/io";
import clsx from "clsx";
import { toast } from "react-toastify";
import { apiPutVarriantProduct } from "../../apis";
import { closeModalRedux } from "../../redux/features/app/appSlice";
import { useDispatch } from "react-redux";

const VarriantProduct = ({ product, setUpdate }) => {
    const dispatch = useDispatch()
    const [isloading, setIsloading] = useState(false);
    const [showRemove, setShowRemove] = useState({ thumb: false, image: false });
    const [preview, setPreview] = useState({
        thumb: null,
        images: [],
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset
    } = useForm({
        defaultValues: {
            title: "",
            price: "",
            quantity: "",
            color: "",
        },
    });
    const onSubmit = async (data) => {
        console.log(data);
        const finalPayload = {...data}
        const formData = new FormData()
        for(let i of Object.entries(finalPayload)){
            if(i[0] == 'thumb'){
                formData.append('thumb',finalPayload?.thumb[0])
                continue
            }
            if(i[0] == 'images'){
                for(let image of finalPayload?.images) formData.append('images',image)
                continue
            }
            if(i[0] == 'title'){
                formData.append('title',finalPayload?.title?.toUpperCase())
                continue
            }
            if(i[0] == 'color'){
                formData.append('color',finalPayload?.color?.toUpperCase())
                continue
            }
            formData.append(i[0],i[1])
        } 
        setIsloading(true)
        const res = await apiPutVarriantProduct(formData,product?._id)
        setIsloading(false)
        if(res?.success) {
            toast.success(res?.mes)
            setUpdate(prve => ({...prve}))
            setPreview({thumb: null,images: []})
            setShowRemove({ thumb: false, image: false })
            reset()
            //dispatch(closeModalRedux())
        }
        else toast.error(res?.mes)
    };
    const handlePreviewThumb = async (file) => {
        const base64Thumb = await toBase64(file);
        setPreview((prve) => ({ ...prve, thumb: base64Thumb }));
    };
    const handlePreviewImages = async (files) => {
        const imagesPreview = [];
        for (let file of files) {
            if (file.type !== "image/png" && file.type !== "image/jpeg") {
                toast.warning("File not supported !");
                return;
            }
            const base64Image = await toBase64(file);
            imagesPreview.push({ name: file?.name, path: base64Image });
        }
        setPreview((prve) => ({ ...prve, images: imagesPreview }));
    };
    const handleRemoveThumb = () => {
        setPreview((prve) => ({ ...prve, thumb: null }));
    };
    const handleRomoveImages = (name) => {
        if (preview?.images?.some((el) => el.name === name))
            setPreview((prve) => ({
                ...prve,
                images: prve?.images?.filter((el) => el.name !== name),
            }));
    };
    useEffect(() => {
        if (watch("thumb").length > 0) {
            handlePreviewThumb(watch("thumb")[0]);
        }
    }, [watch("thumb")]);
    useEffect(() => {
        if (watch("images").length > 0) {
            handlePreviewImages(watch("images"));
        }
    }, [watch("images")]);
    return (
        <div className="w-[900px] text-sm animate-slide-top shadow-2xl border bg-white">
            <h2 className="text-lg font-bold p-3 border-b">Varriant product</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="w-full px-5">
                    <div className="flex gap-3 items-center my-3">
                        <InputFrom
                            className="flex-1 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                            register={register}
                            errors={errors}
                            id="title"
                            validate={{ required: "Title cannot be blank" }}
                            placeholder="Title..."
                            lable="Title"
                        />
                        <InputFrom
                            className="flex-1 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                            register={register}
                            errors={errors}
                            id="price"
                            type="number"
                            validate={{ required: "Price cannot be blank" }}
                            placeholder="Price..."
                            lable="Price"
                        />
                        <InputFrom
                            className="flex-1 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                            register={register}
                            errors={errors}
                            id="quantity"
                            type="number"
                            validate={{ required: "Quantity cannot be blank" }}
                            placeholder="Quantity..."
                            lable="Quantity"
                        />
                        <InputFrom
                            className="flex-1 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                            register={register}
                            errors={errors}
                            id="color"
                            validate={{ required: "Color cannot be blank" }}
                            placeholder="Color..."
                            lable="Color"
                        />
                    </div>
                    <div className="flex items-center gap-3 my-3">
                        <div className="w-full">
                            <label
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                htmlFor="thumb"
                            >
                                Thumb
                            </label>
                            <div className="flex items-center justify-center w-full relative">
                                <label
                                    htmlFor="thumb"
                                    className="bg-transparent z-30 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-[rgba(0,0,0,.2)]"
                                >
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg
                                            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 20 16"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                stroke-width="2"
                                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                            />
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                            <span className="font-semibold">Click to upload</span> or
                                            drag and drop
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            SVG, PNG, JPG or GIF (MAX. 800x400px)
                                        </p>
                                    </div>
                                    <input
                                        id="thumb"
                                        {...register("thumb", {
                                            required: "Thumb cannot be blank",
                                        })}
                                        type="file"
                                        className="hidden"
                                    />
                                </label>
                                {preview?.thumb && (
                                    <img
                                        src={preview?.thumb}
                                        alt="thumbnail"
                                        className="object-contain w-[220px] h-[220px] m-auto absolute inset-0 z-20"
                                    />
                                )}
                                {preview?.thumb && (
                                    <button
                                        onClick={handleRemoveThumb}
                                        className="absolute bottom-2 right-2 z-40 hover:bg-main hover:text-white p-3 border rounded-lg"
                                        type="button"
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>
                            {errors["thumb"] && (
                                <small className="text-xs text-red-500">
                                    {errors["thumb"]?.message}
                                </small>
                            )}
                        </div>
                        <div className="w-full">
                            <label
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                htmlFor="images"
                            >
                                Images
                            </label>
                            <div className="flex items-center justify-center w-full relative">
                                <label
                                    htmlFor="images"
                                    className="bg-transparent z-30 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-[rgba(0,0,0,.2)]"
                                >
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg
                                            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 20 16"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                stroke-width="2"
                                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                            />
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                            <span className="font-semibold">Click to upload</span> or
                                            drag and drop
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            SVG, PNG, JPG or GIF (MAX. 800x400px)
                                        </p>
                                    </div>
                                    <input
                                        id="images"
                                        {...register("images", {
                                            required: "Images cannot be blank",
                                        })}
                                        type="file"
                                        multiple
                                        className="hidden"
                                    />
                                </label>
                                {preview?.images?.length > 0 && (
                                    <div
                                        className={clsx(
                                            "absolute inset-0 z-20 flex flex-wrap gap-3 p-4",
                                            showRemove?.image ? "z-40" : ""
                                        )}
                                    >
                                        {preview?.images?.map((el, index) => (
                                            <div
                                                key={`CreateProducts-preview-images-${index}`}
                                                className="w-[98px] h-[98px] relative"
                                            >
                                                <img
                                                    src={el?.path}
                                                    alt={`images-${index}`}
                                                    className="w-full h-full border object-cover"
                                                />
                                                {showRemove?.image && (
                                                    <div className="absolute inset-0 bg-[rgba(0,0,0,.2)]">
                                                        <span
                                                            onClick={() => handleRomoveImages(el?.name)}
                                                            className="absolute top-0 right-0 cursor-pointer p-2 m-1 hover:bg-white rounded-full"
                                                        >
                                                            <IoMdClose />
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {preview?.images?.length > 0 && (
                                    <button
                                        onClick={() =>
                                            setShowRemove((prve) => ({ ...prve, image: !prve.image }))
                                        }
                                        className="absolute bottom-2 right-2 z-40 hover:bg-main hover:text-white p-3 border rounded-lg"
                                        type="button"
                                    >
                                        {showRemove?.image ? "Close" : "Remove"}
                                    </button>
                                )}
                            </div>
                            {errors["images"] && (
                                <small className="text-xs text-red-500">
                                    {errors["images"]?.message}
                                </small>
                            )}
                        </div>
                    </div>
                    <div className="text-end mx-5 mb-5 items-center">
                        <button
                            type="submit"
                            className="min-w-[130px] button p-4 border rounded-[10px]"
                        >
                            Add new varriant product
                        </button>
                    </div>
                </div>
            </form>
            {isloading && <Loading/>}
        </div>
    );
};

export default memo(VarriantProduct);
