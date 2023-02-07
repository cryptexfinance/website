import React, { useState } from "react"
import { toast, ToastContainer } from "react-toastify"
import addToMailchimp from "gatsby-plugin-mailchimp"
import { FaArrowRight } from "react-icons/fa"
import toasty from "../../../../static/toasty.png"
import sewagFruit from "../../../../static/website/ecosystem/sewage-fruit.png"

const SectionEcosystem = ({ data }) => {
  const [email, setEmail] = useState("")
  const [index, setIndex] = useState(0)

  const handleSubmit = async e => {
    e.preventDefault()
    const res = await addToMailchimp(email)
    if (res.result === "success") {
      console.log(res)
      Toast(
        "✔️ You’re Subscribed!",
        "Keep an eye out for updates from our team.",
        "success"
      )
      clearValues()
    } else {
      console.log(res)
      Toast("❌    Error", res.msg, "error")
    }
  }

  const handleEmailChange = e => {
    setEmail(e.currentTarget.value)
  }

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex)
  }

  const clearValues = () => {
    setEmail("")
  }

  const Toast = async (
    title,
    body,
    type,
    duration = 3000,
    fn = () => {},
    delay = 0
  ) => {
    const toastConstant = (
      <div className="body">
        <img src={toasty} alt="toasty" className="toasty" />
        <h5>{title}</h5>
        <p>{body}</p>
      </div>
    )
    if (type === "success") {
      toast.success(toastConstant, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: duration,
        hideProgressBar: true,
        delay,
        onClose: () => {
          fn()
        },
      })
    } else {
      toast.error(toastConstant, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: duration,
        hideProgressBar: true,
        delay,
        onClose: () => {
          fn()
        },
      })
    }
  }

  return (
    <div id="ecosystem" className="section-ecosystem">
      <ToastContainer />
      <h1>Community</h1>
    </div>
  )
}

export default SectionEcosystem
