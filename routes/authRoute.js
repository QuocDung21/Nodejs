const express = require("express");
const passport = require("passport");
const {
  createUser,
  loginUserCtrl,
  getallUser,
  getaUser,
  deleteaUser,
  updatedUser,
  blockUser,
  unblockUser,
  handleRefreshToken,
  logout,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
  loginAdmin,
  getWishlist,
  saveAddress,
  userCart,
  getUserCart,
  emptyCart,
  applyCoupon,
  createOrder,
  getOrders,
  updateOrderStatus,
  getAllOrders,
} = require("../controller/userCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const middlewareController = require("./middlewareController");
const router = express.Router();
router.post("/register", createUser);
router.post("/forgot-password-token", forgotPasswordToken);

router.put("/reset-password/:token", resetPassword);

router.put("/password", authMiddleware, updatePassword);
router.post("/login", loginUserCtrl);
router.post("/admin-login", loginAdmin);
router.post("/cart", authMiddleware, userCart);
router.post("/cart/applycoupon", authMiddleware, applyCoupon);
router.post("/cart/cash-order", authMiddleware, createOrder);
router.get("/all-users", getallUser);
router.get("/get-orders", authMiddleware, getOrders);
router.get("/getallorders", authMiddleware, isAdmin, getAllOrders);
router.post("/getorderbyuser/:id", authMiddleware, isAdmin, getAllOrders);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);
router.get("/wishlist", authMiddleware, getWishlist);
router.get("/cart", authMiddleware, getUserCart);

router.get("/:id", authMiddleware, isAdmin, getaUser);
router.delete("/empty-cart", authMiddleware, emptyCart);
router.delete("/:id", deleteaUser);
router.put(
  "/order/update-order/:id",
  authMiddleware,
  isAdmin,
  updateOrderStatus
);
router.put("/edit-user", authMiddleware, updatedUser);
router.put("/save-address", authMiddleware, saveAddress);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);

// Google Account

// router.get("/auth/google/success", (req, res) => {
//   if (req.user) {
//     res.status(200).json({
//       error: false,
//       message: "Successfully Loged In",
//       user: req.user,
//     });
//   } else {
//     res.status(403).json({ error: true, message: "Not Authorized" });
//   }
// });

// router.get("/login/failed", (req, res) => {
//   res.status(401).json({
//     error: true,
//     message: "Log in failure",
//   });
// });

// router.get("/google", passport.authenticate("google", ["profile", "email"]));

// router.get(
//   "/google/callback",
//   passport.authenticate("google", {
//     successRedirect: process.env.CLIENT_URL || "http://localhost:3000/",
//     failureRedirect: "/login/failed",
//   })
// );

// router.get("/logout", (req, res) => {
//   req.logout();
//   res.redirect(process.env.CLIENT_URL || "http://localhost:3000/");
// });

// const isLoggedIn = (req, res, next) => {
//   req.user ? next() : res.sendStatus(401);
// };
// router.get(
//   "/auth/google",
//   passport.authenticate("google", { scope: ["email", "profile"] })
// );

// router.get(
//   "/auth/google/callback",
//   passport.authenticate("google", {
//     // successRedirect: "http://localhost:3000/login",
//     successRedirect: "/api/user/auth/protected",
//     failureRedirect: "/api/user/auth/google/failure",
//   })
// );
// router.get("/auth/protected", isLoggedIn, (req, res) => {
//   console.log(req.user);
//   res.cookie("user_google", req.user, {
//     httpOnly: true,
//     maxAge: 72 * 60 * 60 * 1000,
//   });
//   res.redirect("http://localhost:3000/login");
//   // res.json(req.user);
// });

// router.get("/auth/google/failure", (req, res) => {
//   res.send("Something went wrong");
// });

// router.get("/auth/logout/", (req, res) => {
//   res.clearCookie("user_google", {
//     httpOnly: true,
//     secure: true,
//   });
//   res.redirect("http://localhost:3000/login");
// });

module.exports = router;
