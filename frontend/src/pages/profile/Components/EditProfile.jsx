import React, { useEffect, useState, useRef } from 'react'
import { X } from 'lucide-react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Camera } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'
import { DialogFooter } from '@/components/ui/dialog'

const EditProfile = ({ onOpenChange }) => {
    const {user}=useAuth()
    const [isLoading, setIsLoading]=useState()
    const [avatarPreview, setAvatarPreview] = useState(user && user.image ? user.image : null)
    const fileInputRef = useRef(null);



    useEffect(() => {
        document.body.style.overflow = "hidden"

        return () => {
            document.body.style.overflow = ""
        }
    }, [])

    const handleSubmit=()=>{
        console.log("this is submit")
    }

    const handleAvatarClick=()=>{
        console.log("this is avatar click")
    }

    const handleFileChange=()=>{
        console.log("this is handleFile Change")
    }

    return (
        <div className='fixed left-0 top-0 z-50 bg-black/50 flex justify-center items-center h-[100dvh] w-full ' onClick={() => onOpenChange()}>
            <div className='bg-white h-170 w-[500px] border rounded-lg flex-col'onClick={(e)=>e.stopPropagation()} >
                <div className='p-[24px] flex flex-col'>
                    <div className='flex justify-between'>
                        <div className=' font-bold text-lg text-gray-800 '>
                            Edit Profile
                        </div>
                        <div className='cursor-pointer' onClick={()=>onOpenChange()}>
                            <X />
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6 py-4">
                        <div className="flex flex-col items-center">
                            <div className="relative group cursor-pointer" onClick={handleAvatarClick}>
                                <Avatar className="h-24 w-24">
                                    <AvatarImage src={avatarPreview || ""} alt={user.fullName} />
                                    <AvatarFallback className="text-2xl bg-emerald-100 text-emerald-800">SG</AvatarFallback>
                                </Avatar>
                                <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Camera className="h-8 w-8 text-white" />
                                </div>
                                <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
                            </div>
                            <p className="text-sm text-gray-500 mt-2">Click to change avatar</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="fullName">Full Name</Label>
                                <Input
                                    id="fullName"
                                    value={user.fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    placeholder="John Doe"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={user.email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="john@example.com"
                                    disabled
                                />
                                <p className="text-xs text-gray-500">Email cannot be changed</p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="mobile">Mobile Number</Label>
                                <Input
                                    id="mobile"
                                    value={user.mobile}
                                    // onChange={(e) => setMobile(e.target.value)}
                                    placeholder="+91 5551234567"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="website">Website</Label>
                                <Input
                                    id="website"
                                    value={user.website}
                                    // onChange={(e) => setWebsite(e.target.value)}
                                    placeholder="https://example.com"
                                />
                            </div>

                            <div className='space-y-2'>
                                <Label htmlFor="organization">Organization</Label>
                                <Input 
                                    id="organization"
                                    value={user.organization}

                                    placeholder="your oragnization"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="bio">Bio</Label>
                            <textarea
                                id="bio"
                                value={user.bio}
                                // onChange={(e) => setBio(e.target.value)}
                                placeholder="Tell us a little about yourself"
                                className="w-full min-h-[100px] rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                            />
                        </div>

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" className="bg-emerald-500 hover:bg-emerald-600" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    "Save Changes"
                                )}
                            </Button>
                        </DialogFooter>
                    </form>


                </div>




            </div>
        </div>
    )
}

export default EditProfile
