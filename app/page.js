"use client";

const GLOBAL_STYLES = `
  .btn-3d {
    background-image: linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 50%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0.08) 100%);
    text-shadow: 0 1px 2px rgba(0,0,0,0.3);
    box-shadow: 0 2px 4px rgba(0,0,0,0.18), 0 1px 2px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.15);
    transition: all 0.15s ease;
    position: relative;
    font-weight: 700 !important;
    letter-spacing: 0.02em;
  }
  .btn-3d.text-white, .btn-3d .text-white {
    color: #fff !important;
    text-shadow: 0 1px 2px rgba(0,0,0,0.5) !important;
  }
  .btn-3d:hover {
    box-shadow: 0 4px 8px rgba(0,0,0,0.2), 0 2px 4px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.3);
    transform: translateY(-1px);
  }
  .btn-3d:active {
    box-shadow: 0 1px 2px rgba(0,0,0,0.15), inset 0 1px 3px rgba(0,0,0,0.1);
    transform: translateY(1px);
  }
  .pill-3d {
    background-image: linear-gradient(to bottom, rgba(255,255,255,0.12) 0%, rgba(0,0,0,0.04) 100%);
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.2);
    transition: all 0.15s ease;
    font-weight: 600 !important;
  }
  .pill-3d:hover {
    box-shadow: 0 2px 6px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.3);
    transform: translateY(-1px);
  }
  .pill-3d-active {
    background-image: linear-gradient(to bottom, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.08) 100%);
    box-shadow: 0 2px 4px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.15);
    font-weight: 700 !important;
  }
  input[type="text"], input[type="date"], input[type="number"], select, textarea,
  input.rounded.border, input.flex-1.rounded.border {
    border-radius: 0.75rem !important;
    border: 1px solid #d1d5db !important;
    box-shadow: inset 0 2px 4px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04) !important;
    transition: all 0.15s ease !important;
    padding: 0.5rem 0.75rem !important;
  }
  input[type="text"]:focus, input[type="date"]:focus, select:focus, textarea:focus {
    border-color: #059669 !important;
    box-shadow: inset 0 2px 4px rgba(0,0,0,0.06), 0 0 0 3px rgba(5,150,105,0.15) !important;
    outline: none !important;
  }
  select {
    border-radius: 0.75rem !important;
    background-image: linear-gradient(to bottom, rgba(255,255,255,0.8) 0%, rgba(0,0,0,0.02) 100%) !important;
  }
  .btn-green-3d {
    background: linear-gradient(to bottom, #15803d, #14532d) !important;
    color: #ffffff !important;
    font-weight: 800 !important;
    text-shadow: 0 1px 2px rgba(0,0,0,0.6) !important;
    box-shadow: 0 4px 0px #0f3d20, 0 6px 10px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.15) !important;
    border: none !important;
    border-radius: 0.75rem;
    transition: all 0.12s ease;
    -webkit-font-smoothing: antialiased;
  }
  .btn-green-3d:hover {
    background: linear-gradient(to bottom, #16a34a, #15803d) !important;
    box-shadow: 0 5px 0px #0f3d20, 0 8px 14px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2) !important;
    transform: translateY(-1px);
  }
  .bubble-blue {
    background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 50%, #1e3a8a 100%);
    color: #ffffff;
    border-radius: 50%;
    width: 100px;
    height: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: 0 6px 0px #1e3a8a, 0 8px 16px rgba(0,0,0,0.3), inset 0 2px 0 rgba(255,255,255,0.2);
    border: none;
    transition: all 0.15s ease;
    cursor: pointer;
    -webkit-font-smoothing: antialiased;
  }
  .bubble-blue:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 0px #1e3a8a, 0 10px 20px rgba(0,0,0,0.35), inset 0 2px 0 rgba(255,255,255,0.25);
  }
  .bubble-blue:active {
    transform: translateY(3px);
    box-shadow: 0 2px 0px #1e3a8a, 0 3px 6px rgba(0,0,0,0.2);
  }
  @keyframes bubbleBurst {
    0% { transform: scale(1); opacity: 1; }
    30% { transform: scale(1.8); opacity: 0.8; }
    60% { transform: scale(3.5); opacity: 0.4; border-radius: 30%; }
    100% { transform: scale(8); opacity: 0; border-radius: 10%; }
  }
  .bubble-burst {
    animation: bubbleBurst 0.4s ease-out forwards !important;
    z-index: 100;
    pointer-events: none;
  }
  @keyframes tableShine {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 0.5; }
  }
  
  @keyframes handGrab {
    0% { transform: translateX(120px) rotate(0deg); opacity: 0; }
    20% { transform: translateX(40px) rotate(-5deg); opacity: 1; }
    40% { transform: translateX(0px) rotate(-10deg); opacity: 1; }
    60% { transform: translateX(-30px) rotate(-5deg); opacity: 1; }
    100% { transform: translateX(-300px) rotate(15deg); opacity: 0; }
  }
  @keyframes platePulled {
    0% { transform: scale(1) translateX(0); opacity: 1; }
    30% { transform: scale(1.05) translateX(-10px); opacity: 1; }
    100% { transform: scale(0.6) translateX(-350px) rotate(-20deg); opacity: 0; }
  }
  @keyframes fadeInPage {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-8px); }
  }
  .bubble-green {
    background: linear-gradient(135deg, #16a34a 0%, #15803d 50%, #14532d 100%);
    color: #ffffff;
    border-radius: 50%;
    width: 100px;
    height: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: 0 6px 0px #0f3d20, 0 8px 16px rgba(0,0,0,0.3), inset 0 2px 0 rgba(255,255,255,0.2);
    border: none;
    transition: transform 0.3s ease, box-shadow 0.3s ease, width 0.3s ease, height 0.3s ease;
    cursor: pointer;
    -webkit-font-smoothing: antialiased;
    animation: float 3s ease-in-out infinite;
  }
  .bubble-green:nth-child(1) { animation-delay: 0s; }
  .bubble-green:nth-child(2) { animation-delay: 0.4s; }
  .bubble-green:nth-child(3) { animation-delay: 0.8s; }
  .bubble-green:nth-child(4) { animation-delay: 1.2s; }
  .bubble-green:nth-child(5) { animation-delay: 1.6s; }
  .bubble-green:nth-child(6) { animation-delay: 2.0s; }
  .bubble-green:active {
    animation-play-state: paused;
    transform: scale(0.92);
    box-shadow: 0 2px 0px #0f3d20, 0 3px 6px rgba(0,0,0,0.2);
  }
  @keyframes dance {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    25% { transform: translateY(-15px) rotate(-8deg); }
    50% { transform: translateY(-5px) rotate(0deg); }
    75% { transform: translateY(-15px) rotate(8deg); }
  }
  @keyframes danceRight {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    25% { transform: translateY(-12px) rotate(10deg); }
    50% { transform: translateY(-3px) rotate(0deg); }
    75% { transform: translateY(-12px) rotate(-10deg); }
  }
  @keyframes jumpIn {
    0% { transform: translateY(0) scale(1); opacity: 1; }
    40% { transform: translateY(-60px) scale(1.2); opacity: 1; }
    70% { transform: translateY(-20px) scale(0.9); opacity: 1; }
    85% { transform: translateY(30px) scale(0.7); opacity: 0.7; }
    100% { transform: translateY(40px) scale(0.3); opacity: 0; }
  }
  @keyframes potBubble {
    0%, 100% { transform: scale(1); opacity: 0.7; }
    50% { transform: scale(1.5) translateY(-8px); opacity: 0; }
  }
  @keyframes potSteam {
    0% { transform: translateY(0) scaleX(1); opacity: 0.6; }
    100% { transform: translateY(-30px) scaleX(1.5); opacity: 0; }
  }
  @keyframes potWiggle {
    0%, 100% { transform: rotate(0deg); }
    25% { transform: rotate(-2deg); }
    75% { transform: rotate(2deg); }
  }
  @keyframes happy {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }
  .stew-scene { position: relative; height: 220px; width: 100%; overflow: hidden; margin: 0 auto; }
  .stew-pot {
    position: absolute; bottom: 0; left: 50%; transform: translateX(-50%);
    width: 160px; height: 90px; background: linear-gradient(to bottom, #6b7280, #4b5563);
    border-radius: 0 0 40% 40%; border-top: 8px solid #374151;
    animation: potWiggle 0.5s ease-in-out infinite;
    z-index: 10;
  }
  .pot-rim {
    position: absolute; bottom: 82px; left: 50%; transform: translateX(-50%);
    width: 180px; height: 16px; background: linear-gradient(to bottom, #9ca3af, #6b7280);
    border-radius: 8px; z-index: 11;
  }
  .pot-liquid {
    position: absolute; bottom: 8px; left: 50%; transform: translateX(-50%);
    width: 148px; height: 50px; background: linear-gradient(to bottom, #ea580c, #c2410c);
    border-radius: 0 0 38% 38%; z-index: 11;
  }
  .pot-handle-l {
    position: absolute; bottom: 55px; left: calc(50% - 95px);
    width: 20px; height: 30px; border: 4px solid #374151; border-right: none;
    border-radius: 10px 0 0 10px; z-index: 9;
  }
  .pot-handle-r {
    position: absolute; bottom: 55px; left: calc(50% + 75px);
    width: 20px; height: 30px; border: 4px solid #374151; border-left: none;
    border-radius: 0 10px 10px 0; z-index: 9;
  }
  .food-char {
    position: absolute; bottom: 95px; font-size: 32px; z-index: 12;
    animation: dance 0.8s ease-in-out infinite;
  }
  .food-char.r { animation-name: danceRight; }
  .food-char.jump {
    animation: jumpIn 1s ease-in forwards;
  }
  .steam {
    position: absolute; font-size: 18px; z-index: 15; opacity: 0.6;
    animation: potSteam 1.5s ease-out infinite;
  }
  .bubble-pot {
    position: absolute; width: 8px; height: 8px; background: rgba(255,255,255,0.6);
    border-radius: 50%; z-index: 12;
    animation: potBubble 1s ease-in-out infinite;
  }
  .btn-green-3d:active {
    transform: translateY(3px);
    box-shadow: 0 1px 0px #0f3d20, 0 2px 4px rgba(0,0,0,0.2) !important;
  }
  .card-3d {
    box-shadow: 0 4px 12px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.06);
    transition: all 0.2s ease;
  }
  .card-3d:hover {
    box-shadow: 0 8px 24px rgba(0,0,0,0.1), 0 2px 6px rgba(0,0,0,0.06);
  }
`;

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Bell, PlusCircle, ChefHat, Users, ShoppingCart } from "lucide-react";

const STORAGE_KEY = "trackfresh.items";
const COMMUNITY_KEY = "trackfresh.community";
const USERNAME_KEY = "trackfresh.username";
const SHOPPING_KEY = "trackfresh.shopping";
const MEAL_KEY = "trackfresh.meals";

const CATEGORIES = ["Produce", "Dairy", "Meat", "Pantry", "Leftovers", "Other"];
const LOCATIONS = ["Fridge", "Freezer", "Pantry"];

const FOOD_DB = [
  // === PRODUCE ===
  { name: "Apples", category: "Produce", location: "Fridge", daysSealed: 28, daysAfterOpening: null },
  { name: "Asparagus", category: "Produce", location: "Fridge", daysSealed: 5, daysAfterOpening: null },
  { name: "Avocado", category: "Produce", location: "Fridge", daysSealed: 5, daysAfterOpening: 2 },
  { name: "Bananas", category: "Produce", location: "Pantry", daysSealed: 7, daysAfterOpening: null },
  { name: "Basil", category: "Produce", location: "Fridge", daysSealed: 7, daysAfterOpening: null },
  { name: "Beets", category: "Produce", location: "Fridge", daysSealed: 14, daysAfterOpening: null },
  { name: "Bell Peppers", category: "Produce", location: "Fridge", daysSealed: 10, daysAfterOpening: 5 },
  { name: "Berries", category: "Produce", location: "Fridge", daysSealed: 5, daysAfterOpening: null },
  { name: "Blackberries", category: "Produce", location: "Fridge", daysSealed: 4, daysAfterOpening: null },
  { name: "Blueberries", category: "Produce", location: "Fridge", daysSealed: 10, daysAfterOpening: null },
  { name: "Bok Choy", category: "Produce", location: "Fridge", daysSealed: 5, daysAfterOpening: null },
  { name: "Broccoli", category: "Produce", location: "Fridge", daysSealed: 7, daysAfterOpening: null },
  { name: "Brussels Sprouts", category: "Produce", location: "Fridge", daysSealed: 7, daysAfterOpening: null },
  { name: "Butternut Squash", category: "Produce", location: "Pantry", daysSealed: 30, daysAfterOpening: 5 },
  { name: "Cabbage", category: "Produce", location: "Fridge", daysSealed: 14, daysAfterOpening: 5 },
  { name: "Cantaloupe", category: "Produce", location: "Fridge", daysSealed: 7, daysAfterOpening: 3 },
  { name: "Carrots", category: "Produce", location: "Fridge", daysSealed: 21, daysAfterOpening: 7 },
  { name: "Cauliflower", category: "Produce", location: "Fridge", daysSealed: 7, daysAfterOpening: null },
  { name: "Celery", category: "Produce", location: "Fridge", daysSealed: 14, daysAfterOpening: 7 },
  { name: "Cherries", category: "Produce", location: "Fridge", daysSealed: 7, daysAfterOpening: null },
  { name: "Cilantro", category: "Produce", location: "Fridge", daysSealed: 7, daysAfterOpening: null },
  { name: "Corn", category: "Produce", location: "Fridge", daysSealed: 5, daysAfterOpening: null },
  { name: "Cranberries", category: "Produce", location: "Fridge", daysSealed: 21, daysAfterOpening: null },
  { name: "Cucumber", category: "Produce", location: "Fridge", daysSealed: 7, daysAfterOpening: 3 },
  { name: "Eggplant", category: "Produce", location: "Fridge", daysSealed: 7, daysAfterOpening: null },
  { name: "Garlic", category: "Produce", location: "Pantry", daysSealed: 60, daysAfterOpening: 10 },
  { name: "Ginger", category: "Produce", location: "Fridge", daysSealed: 21, daysAfterOpening: 7 },
  { name: "Grapes", category: "Produce", location: "Fridge", daysSealed: 10, daysAfterOpening: null },
  { name: "Green Beans", category: "Produce", location: "Fridge", daysSealed: 7, daysAfterOpening: null },
  { name: "Green Onions", category: "Produce", location: "Fridge", daysSealed: 7, daysAfterOpening: null },
  { name: "Honeydew", category: "Produce", location: "Fridge", daysSealed: 7, daysAfterOpening: 3 },
  { name: "Jalapenos", category: "Produce", location: "Fridge", daysSealed: 14, daysAfterOpening: null },
  { name: "Kale", category: "Produce", location: "Fridge", daysSealed: 7, daysAfterOpening: null },
  { name: "Leeks", category: "Produce", location: "Fridge", daysSealed: 10, daysAfterOpening: null },
  { name: "Lemons", category: "Produce", location: "Fridge", daysSealed: 21, daysAfterOpening: 5 },
  { name: "Lettuce", category: "Produce", location: "Fridge", daysSealed: 7, daysAfterOpening: 3 },
  { name: "Limes", category: "Produce", location: "Fridge", daysSealed: 21, daysAfterOpening: 5 },
  { name: "Mangoes", category: "Produce", location: "Fridge", daysSealed: 7, daysAfterOpening: 3 },
  { name: "Mushrooms", category: "Produce", location: "Fridge", daysSealed: 7, daysAfterOpening: 4 },
  { name: "Nectarines", category: "Produce", location: "Fridge", daysSealed: 5, daysAfterOpening: null },
  { name: "Onions", category: "Produce", location: "Pantry", daysSealed: 30, daysAfterOpening: 7 },
  { name: "Oranges", category: "Produce", location: "Fridge", daysSealed: 21, daysAfterOpening: null },
  { name: "Parsley", category: "Produce", location: "Fridge", daysSealed: 10, daysAfterOpening: null },
  { name: "Peaches", category: "Produce", location: "Fridge", daysSealed: 5, daysAfterOpening: null },
  { name: "Pears", category: "Produce", location: "Fridge", daysSealed: 7, daysAfterOpening: null },
  { name: "Peas", category: "Produce", location: "Freezer", daysSealed: 240, daysAfterOpening: null },
  { name: "Pineapple", category: "Produce", location: "Fridge", daysSealed: 5, daysAfterOpening: 3 },
  { name: "Plums", category: "Produce", location: "Fridge", daysSealed: 5, daysAfterOpening: null },
  { name: "Pomegranate", category: "Produce", location: "Fridge", daysSealed: 30, daysAfterOpening: 5 },
  { name: "Potatoes", category: "Produce", location: "Pantry", daysSealed: 28, daysAfterOpening: null },
  { name: "Radishes", category: "Produce", location: "Fridge", daysSealed: 14, daysAfterOpening: null },
  { name: "Raspberries", category: "Produce", location: "Fridge", daysSealed: 3, daysAfterOpening: null },
  { name: "Romaine Lettuce", category: "Produce", location: "Fridge", daysSealed: 7, daysAfterOpening: 3 },
  { name: "Rosemary", category: "Produce", location: "Fridge", daysSealed: 14, daysAfterOpening: null },
  { name: "Shallots", category: "Produce", location: "Pantry", daysSealed: 30, daysAfterOpening: 7 },
  { name: "Snow Peas", category: "Produce", location: "Fridge", daysSealed: 5, daysAfterOpening: null },
  { name: "Spinach", category: "Produce", location: "Fridge", daysSealed: 7, daysAfterOpening: 3 },
  { name: "Strawberries", category: "Produce", location: "Fridge", daysSealed: 5, daysAfterOpening: null },
  { name: "Sweet Potatoes", category: "Produce", location: "Pantry", daysSealed: 28, daysAfterOpening: null },
  { name: "Swiss Chard", category: "Produce", location: "Fridge", daysSealed: 5, daysAfterOpening: null },
  { name: "Thyme", category: "Produce", location: "Fridge", daysSealed: 14, daysAfterOpening: null },
  { name: "Tomatoes", category: "Produce", location: "Pantry", daysSealed: 7, daysAfterOpening: 3 },
  { name: "Turnips", category: "Produce", location: "Fridge", daysSealed: 14, daysAfterOpening: null },
  { name: "Watermelon", category: "Produce", location: "Fridge", daysSealed: 7, daysAfterOpening: 3 },
  { name: "Zucchini", category: "Produce", location: "Fridge", daysSealed: 7, daysAfterOpening: null },

  // === DAIRY ===
  { name: "Butter", category: "Dairy", location: "Fridge", daysSealed: 90, daysAfterOpening: 30 },
  { name: "Buttermilk", category: "Dairy", location: "Fridge", daysSealed: 14, daysAfterOpening: 7 },
  { name: "Cheddar Cheese", category: "Dairy", location: "Fridge", daysSealed: 42, daysAfterOpening: 21 },
  { name: "Colby Jack", category: "Dairy", location: "Fridge", daysSealed: 42, daysAfterOpening: 21 },
  { name: "Cottage Cheese", category: "Dairy", location: "Fridge", daysSealed: 14, daysAfterOpening: 7 },
  { name: "Cream", category: "Dairy", location: "Fridge", daysSealed: 21, daysAfterOpening: 7 },
  { name: "Cream Cheese", category: "Dairy", location: "Fridge", daysSealed: 30, daysAfterOpening: 14 },
  { name: "Eggs", category: "Dairy", location: "Fridge", daysSealed: 35, daysAfterOpening: null },
  { name: "Feta Cheese", category: "Dairy", location: "Fridge", daysSealed: 42, daysAfterOpening: 7 },
  { name: "Goat Cheese", category: "Dairy", location: "Fridge", daysSealed: 21, daysAfterOpening: 7 },
  { name: "Greek Yogurt", category: "Dairy", location: "Fridge", daysSealed: 14, daysAfterOpening: 7 },
  { name: "Gruyere", category: "Dairy", location: "Fridge", daysSealed: 42, daysAfterOpening: 21 },
  { name: "Half and Half", category: "Dairy", location: "Fridge", daysSealed: 14, daysAfterOpening: 5 },
  { name: "Heavy Cream", category: "Dairy", location: "Fridge", daysSealed: 21, daysAfterOpening: 7 },
  { name: "Mascarpone", category: "Dairy", location: "Fridge", daysSealed: 14, daysAfterOpening: 5 },
  { name: "Milk", category: "Dairy", location: "Fridge", daysSealed: 10, daysAfterOpening: 7 },
  { name: "Mozzarella", category: "Dairy", location: "Fridge", daysSealed: 21, daysAfterOpening: 7 },
  { name: "Oat Milk", category: "Dairy", location: "Fridge", daysSealed: 10, daysAfterOpening: 7 },
  { name: "Parmesan", category: "Dairy", location: "Fridge", daysSealed: 180, daysAfterOpening: 42 },
  { name: "Pepper Jack", category: "Dairy", location: "Fridge", daysSealed: 42, daysAfterOpening: 21 },
  { name: "Provolone", category: "Dairy", location: "Fridge", daysSealed: 42, daysAfterOpening: 21 },
  { name: "Ricotta", category: "Dairy", location: "Fridge", daysSealed: 14, daysAfterOpening: 5 },
  { name: "Sour Cream", category: "Dairy", location: "Fridge", daysSealed: 21, daysAfterOpening: 14 },
  { name: "Swiss Cheese", category: "Dairy", location: "Fridge", daysSealed: 42, daysAfterOpening: 21 },
  { name: "Whipping Cream", category: "Dairy", location: "Fridge", daysSealed: 21, daysAfterOpening: 5 },
  { name: "Yogurt", category: "Dairy", location: "Fridge", daysSealed: 14, daysAfterOpening: 7 },

  // === MEAT & SEAFOOD ===
  { name: "Bacon", category: "Meat", location: "Fridge", daysSealed: 14, daysAfterOpening: 7 },
  { name: "Bratwurst", category: "Meat", location: "Fridge", daysSealed: 7, daysAfterOpening: 3 },
  { name: "Chicken Breast", category: "Meat", location: "Freezer", daysSealed: 270, daysAfterOpening: 2 },
  { name: "Chicken Thighs", category: "Meat", location: "Freezer", daysSealed: 270, daysAfterOpening: 2 },
  { name: "Chicken Wings", category: "Meat", location: "Freezer", daysSealed: 270, daysAfterOpening: 2 },
  { name: "Chorizo", category: "Meat", location: "Fridge", daysSealed: 14, daysAfterOpening: 7 },
  { name: "Cod", category: "Meat", location: "Freezer", daysSealed: 180, daysAfterOpening: 2 },
  { name: "Crab Meat", category: "Meat", location: "Fridge", daysSealed: 5, daysAfterOpening: 2 },
  { name: "Deli Ham", category: "Meat", location: "Fridge", daysSealed: 7, daysAfterOpening: 5 },
  { name: "Deli Turkey", category: "Meat", location: "Fridge", daysSealed: 7, daysAfterOpening: 5 },
  { name: "Ground Beef", category: "Meat", location: "Freezer", daysSealed: 120, daysAfterOpening: 2 },
  { name: "Ground Pork", category: "Meat", location: "Freezer", daysSealed: 120, daysAfterOpening: 2 },
  { name: "Ground Turkey", category: "Meat", location: "Freezer", daysSealed: 120, daysAfterOpening: 2 },
  { name: "Halibut", category: "Meat", location: "Freezer", daysSealed: 180, daysAfterOpening: 2 },
  { name: "Ham", category: "Meat", location: "Fridge", daysSealed: 7, daysAfterOpening: 5 },
  { name: "Hot Dogs", category: "Meat", location: "Fridge", daysSealed: 14, daysAfterOpening: 7 },
  { name: "Italian Sausage", category: "Meat", location: "Fridge", daysSealed: 7, daysAfterOpening: 3 },
  { name: "Lamb Chops", category: "Meat", location: "Freezer", daysSealed: 180, daysAfterOpening: 3 },
  { name: "Lobster", category: "Meat", location: "Fridge", daysSealed: 2, daysAfterOpening: 1 },
  { name: "Mahi Mahi", category: "Meat", location: "Freezer", daysSealed: 180, daysAfterOpening: 2 },
  { name: "Pepperoni", category: "Meat", location: "Fridge", daysSealed: 42, daysAfterOpening: 21 },
  { name: "Pork Chops", category: "Meat", location: "Freezer", daysSealed: 180, daysAfterOpening: 3 },
  { name: "Pork Tenderloin", category: "Meat", location: "Freezer", daysSealed: 180, daysAfterOpening: 3 },
  { name: "Prosciutto", category: "Meat", location: "Fridge", daysSealed: 14, daysAfterOpening: 5 },
  { name: "Ribeye Steak", category: "Meat", location: "Freezer", daysSealed: 180, daysAfterOpening: 3 },
  { name: "Rotisserie Chicken", category: "Meat", location: "Fridge", daysSealed: 4, daysAfterOpening: 3 },
  { name: "Salami", category: "Meat", location: "Fridge", daysSealed: 42, daysAfterOpening: 14 },
  { name: "Salmon", category: "Meat", location: "Freezer", daysSealed: 180, daysAfterOpening: 2 },
  { name: "Scallops", category: "Meat", location: "Freezer", daysSealed: 90, daysAfterOpening: 1 },
  { name: "Shrimp", category: "Meat", location: "Freezer", daysSealed: 180, daysAfterOpening: 2 },
  { name: "Sirloin Steak", category: "Meat", location: "Freezer", daysSealed: 180, daysAfterOpening: 3 },
  { name: "Smoked Salmon", category: "Meat", location: "Fridge", daysSealed: 14, daysAfterOpening: 5 },
  { name: "Swordfish", category: "Meat", location: "Freezer", daysSealed: 180, daysAfterOpening: 2 },
  { name: "Tilapia", category: "Meat", location: "Freezer", daysSealed: 180, daysAfterOpening: 2 },
  { name: "Tuna", category: "Meat", location: "Pantry", daysSealed: 730, daysAfterOpening: 3 },
  { name: "Tuna Steak", category: "Meat", location: "Freezer", daysSealed: 180, daysAfterOpening: 1 },
  { name: "Turkey Breast", category: "Meat", location: "Freezer", daysSealed: 180, daysAfterOpening: 3 },

  // === CONDIMENTS & SAUCES ===
  { name: "BBQ Sauce", category: "Pantry", location: "Fridge", daysSealed: 365, daysAfterOpening: 120 },
  { name: "Buffalo Sauce", category: "Pantry", location: "Fridge", daysSealed: 365, daysAfterOpening: 90 },
  { name: "Chili Garlic Sauce", category: "Pantry", location: "Fridge", daysSealed: 365, daysAfterOpening: 90 },
  { name: "Dijon Mustard", category: "Pantry", location: "Fridge", daysSealed: 365, daysAfterOpening: 365 },
  { name: "Fish Sauce", category: "Pantry", location: "Pantry", daysSealed: 730, daysAfterOpening: 365 },
  { name: "Hoisin Sauce", category: "Pantry", location: "Fridge", daysSealed: 540, daysAfterOpening: 90 },
  { name: "Honey Mustard", category: "Pantry", location: "Fridge", daysSealed: 365, daysAfterOpening: 60 },
  { name: "Horseradish", category: "Pantry", location: "Fridge", daysSealed: 365, daysAfterOpening: 90 },
  { name: "Hot Sauce", category: "Pantry", location: "Fridge", daysSealed: 730, daysAfterOpening: 180 },
  { name: "Hummus", category: "Pantry", location: "Fridge", daysSealed: 30, daysAfterOpening: 7 },
  { name: "Ketchup", category: "Pantry", location: "Fridge", daysSealed: 365, daysAfterOpening: 180 },
  { name: "Marinara Sauce", category: "Pantry", location: "Pantry", daysSealed: 365, daysAfterOpening: 7 },
  { name: "Mayonnaise", category: "Pantry", location: "Fridge", daysSealed: 180, daysAfterOpening: 60 },
  { name: "Mustard", category: "Pantry", location: "Fridge", daysSealed: 365, daysAfterOpening: 365 },
  { name: "Oyster Sauce", category: "Pantry", location: "Fridge", daysSealed: 540, daysAfterOpening: 90 },
  { name: "Pesto", category: "Pantry", location: "Fridge", daysSealed: 180, daysAfterOpening: 7 },
  { name: "Pickle Relish", category: "Pantry", location: "Fridge", daysSealed: 365, daysAfterOpening: 90 },
  { name: "Ranch Dressing", category: "Pantry", location: "Fridge", daysSealed: 180, daysAfterOpening: 30 },
  { name: "Salsa", category: "Pantry", location: "Fridge", daysSealed: 365, daysAfterOpening: 14 },
  { name: "Soy Sauce", category: "Pantry", location: "Pantry", daysSealed: 1095, daysAfterOpening: 365 },
  { name: "Sriracha", category: "Pantry", location: "Fridge", daysSealed: 730, daysAfterOpening: 180 },
  { name: "Steak Sauce", category: "Pantry", location: "Fridge", daysSealed: 540, daysAfterOpening: 90 },
  { name: "Tahini", category: "Pantry", location: "Pantry", daysSealed: 365, daysAfterOpening: 90 },
  { name: "Tartar Sauce", category: "Pantry", location: "Fridge", daysSealed: 180, daysAfterOpening: 60 },
  { name: "Teriyaki Sauce", category: "Pantry", location: "Fridge", daysSealed: 365, daysAfterOpening: 30 },
  { name: "Vinaigrette", category: "Pantry", location: "Fridge", daysSealed: 90, daysAfterOpening: 14 },
  { name: "Worcestershire Sauce", category: "Pantry", location: "Pantry", daysSealed: 1095, daysAfterOpening: 365 },
  { name: "Yellow Mustard", category: "Pantry", location: "Fridge", daysSealed: 365, daysAfterOpening: 365 },

  // === PANTRY STAPLES ===
  { name: "All-Purpose Flour", category: "Pantry", location: "Pantry", daysSealed: 365, daysAfterOpening: 180 },
  { name: "Almond Butter", category: "Pantry", location: "Pantry", daysSealed: 365, daysAfterOpening: 90 },
  { name: "Almond Flour", category: "Pantry", location: "Pantry", daysSealed: 180, daysAfterOpening: 90 },
  { name: "Baking Powder", category: "Pantry", location: "Pantry", daysSealed: 365, daysAfterOpening: 180 },
  { name: "Baking Soda", category: "Pantry", location: "Pantry", daysSealed: 730, daysAfterOpening: 180 },
  { name: "Balsamic Vinegar", category: "Pantry", location: "Pantry", daysSealed: 1095, daysAfterOpening: 365 },
  { name: "Black Beans", category: "Pantry", location: "Pantry", daysSealed: 730, daysAfterOpening: 5 },
  { name: "Bread", category: "Pantry", location: "Pantry", daysSealed: 7, daysAfterOpening: 5 },
  { name: "Bread Crumbs", category: "Pantry", location: "Pantry", daysSealed: 180, daysAfterOpening: 90 },
  { name: "Brown Rice", category: "Pantry", location: "Pantry", daysSealed: 180, daysAfterOpening: 90 },
  { name: "Brown Sugar", category: "Pantry", location: "Pantry", daysSealed: 730, daysAfterOpening: 120 },
  { name: "Canola Oil", category: "Pantry", location: "Pantry", daysSealed: 730, daysAfterOpening: 365 },
  { name: "Capers", category: "Pantry", location: "Fridge", daysSealed: 365, daysAfterOpening: 365 },
  { name: "Chicken Broth", category: "Pantry", location: "Pantry", daysSealed: 730, daysAfterOpening: 5 },
  { name: "Chickpeas", category: "Pantry", location: "Pantry", daysSealed: 730, daysAfterOpening: 5 },
  { name: "Cocoa Powder", category: "Pantry", location: "Pantry", daysSealed: 1095, daysAfterOpening: 365 },
  { name: "Coconut Milk", category: "Pantry", location: "Pantry", daysSealed: 730, daysAfterOpening: 5 },
  { name: "Coconut Oil", category: "Pantry", location: "Pantry", daysSealed: 730, daysAfterOpening: 365 },
  { name: "Cornstarch", category: "Pantry", location: "Pantry", daysSealed: 730, daysAfterOpening: 365 },
  { name: "Couscous", category: "Pantry", location: "Pantry", daysSealed: 365, daysAfterOpening: 180 },
  { name: "Crackers", category: "Pantry", location: "Pantry", daysSealed: 180, daysAfterOpening: 14 },
  { name: "Dried Pasta", category: "Pantry", location: "Pantry", daysSealed: 730, daysAfterOpening: 365 },
  { name: "Granola", category: "Pantry", location: "Pantry", daysSealed: 180, daysAfterOpening: 30 },
  { name: "Honey", category: "Pantry", location: "Pantry", daysSealed: 1095, daysAfterOpening: 1095 },
  { name: "Jam", category: "Pantry", location: "Fridge", daysSealed: 365, daysAfterOpening: 30 },
  { name: "Jelly", category: "Pantry", location: "Fridge", daysSealed: 365, daysAfterOpening: 30 },
  { name: "Kidney Beans", category: "Pantry", location: "Pantry", daysSealed: 730, daysAfterOpening: 5 },
  { name: "Lentils", category: "Pantry", location: "Pantry", daysSealed: 365, daysAfterOpening: 365 },
  { name: "Maple Syrup", category: "Pantry", location: "Pantry", daysSealed: 730, daysAfterOpening: 365 },
  { name: "Oats", category: "Pantry", location: "Pantry", daysSealed: 365, daysAfterOpening: 180 },
  { name: "Olive Oil", category: "Pantry", location: "Pantry", daysSealed: 730, daysAfterOpening: 180 },
  { name: "Olives", category: "Pantry", location: "Fridge", daysSealed: 365, daysAfterOpening: 14 },
  { name: "Panko", category: "Pantry", location: "Pantry", daysSealed: 365, daysAfterOpening: 90 },
  { name: "Pasta", category: "Pantry", location: "Pantry", daysSealed: 730, daysAfterOpening: 365 },
  { name: "Peanut Butter", category: "Pantry", location: "Pantry", daysSealed: 365, daysAfterOpening: 90 },
  { name: "Pickles", category: "Pantry", location: "Fridge", daysSealed: 365, daysAfterOpening: 90 },
  { name: "Popcorn Kernels", category: "Pantry", location: "Pantry", daysSealed: 730, daysAfterOpening: 365 },
  { name: "Quinoa", category: "Pantry", location: "Pantry", daysSealed: 365, daysAfterOpening: 180 },
  { name: "Raisins", category: "Pantry", location: "Pantry", daysSealed: 365, daysAfterOpening: 90 },
  { name: "Rice", category: "Pantry", location: "Pantry", daysSealed: 730, daysAfterOpening: 365 },
  { name: "Sesame Oil", category: "Pantry", location: "Pantry", daysSealed: 365, daysAfterOpening: 180 },
  { name: "Sugar", category: "Pantry", location: "Pantry", daysSealed: 1095, daysAfterOpening: 730 },
  { name: "Sun-Dried Tomatoes", category: "Pantry", location: "Fridge", daysSealed: 365, daysAfterOpening: 14 },
  { name: "Tomato Paste", category: "Pantry", location: "Pantry", daysSealed: 730, daysAfterOpening: 7 },
  { name: "Tomato Sauce", category: "Pantry", location: "Pantry", daysSealed: 730, daysAfterOpening: 7 },
  { name: "Tortillas", category: "Pantry", location: "Pantry", daysSealed: 21, daysAfterOpening: 7 },
  { name: "Vegetable Broth", category: "Pantry", location: "Pantry", daysSealed: 730, daysAfterOpening: 5 },
  { name: "Walnuts", category: "Pantry", location: "Pantry", daysSealed: 180, daysAfterOpening: 90 },
  { name: "White Rice", category: "Pantry", location: "Pantry", daysSealed: 730, daysAfterOpening: 365 },
  { name: "White Wine Vinegar", category: "Pantry", location: "Pantry", daysSealed: 1095, daysAfterOpening: 365 },

  // === FROZEN ===
  { name: "Frozen Berries", category: "Other", location: "Freezer", daysSealed: 365, daysAfterOpening: 180 },
  { name: "Frozen Broccoli", category: "Other", location: "Freezer", daysSealed: 365, daysAfterOpening: 180 },
  { name: "Frozen Corn", category: "Other", location: "Freezer", daysSealed: 365, daysAfterOpening: 180 },
  { name: "Frozen Pizza", category: "Other", location: "Freezer", daysSealed: 180, daysAfterOpening: null },
  { name: "Frozen Spinach", category: "Other", location: "Freezer", daysSealed: 365, daysAfterOpening: 180 },
  { name: "Frozen Waffles", category: "Other", location: "Freezer", daysSealed: 240, daysAfterOpening: 60 },
  { name: "Ice Cream", category: "Other", location: "Freezer", daysSealed: 60, daysAfterOpening: 30 },

  // === BEVERAGES ===
  { name: "Almond Milk", category: "Other", location: "Fridge", daysSealed: 10, daysAfterOpening: 7 },
  { name: "Apple Juice", category: "Other", location: "Fridge", daysSealed: 21, daysAfterOpening: 7 },
  { name: "Coconut Water", category: "Other", location: "Pantry", daysSealed: 365, daysAfterOpening: 3 },
  { name: "Orange Juice", category: "Other", location: "Fridge", daysSealed: 14, daysAfterOpening: 7 },
  { name: "Soy Milk", category: "Other", location: "Fridge", daysSealed: 10, daysAfterOpening: 7 },

  // === BAKERY ===
  { name: "Bagels", category: "Other", location: "Pantry", daysSealed: 5, daysAfterOpening: 3 },
  { name: "Croissants", category: "Other", location: "Pantry", daysSealed: 3, daysAfterOpening: 2 },
  { name: "English Muffins", category: "Other", location: "Pantry", daysSealed: 14, daysAfterOpening: 7 },
  { name: "Hamburger Buns", category: "Other", location: "Pantry", daysSealed: 7, daysAfterOpening: 5 },
  { name: "Hot Dog Buns", category: "Other", location: "Pantry", daysSealed: 7, daysAfterOpening: 5 },
  { name: "Pita Bread", category: "Other", location: "Pantry", daysSealed: 7, daysAfterOpening: 5 },
  { name: "Sandwich Bread", category: "Other", location: "Pantry", daysSealed: 7, daysAfterOpening: 5 },
  { name: "Sourdough", category: "Other", location: "Pantry", daysSealed: 5, daysAfterOpening: 3 },
  { name: "Wraps", category: "Other", location: "Pantry", daysSealed: 14, daysAfterOpening: 7 },
];

const RECIPE_DB = [
  { name: "Classic Omelette", ingredients: ["eggs","butter","cheese","milk"], requires: ["eggs"], description: "A quick egg omelette with whatever fillings you have.", time: "10 min", instructions: "1. Crack 2-3 eggs into a bowl, add a splash of milk, and whisk well.\n2. Heat butter in a non-stick pan over medium heat until foamy.\n3. Pour in the egg mixture and let it set for 30 seconds.\n4. Using a spatula, gently push the edges toward the center.\n5. Add cheese or any fillings to one half.\n6. Fold the omelette in half and slide onto a plate.\n7. Season with salt and pepper and serve immediately." },
  { name: "Vegetable Stir Fry", ingredients: ["carrots","onions","garlic","oil"], requires: ["carrots","onions"], description: "Healthy stir fry using fresh vegetables.", time: "15 min", instructions: "1. Slice carrots into thin rounds and dice onions.\n2. Heat oil in a wok or large pan over high heat.\n3. Add onions and stir fry for 2 minutes until softened.\n4. Add carrots and any other vegetables.\n5. Add minced garlic and stir fry for another 3-4 minutes.\n6. Season with soy sauce, salt and pepper.\n7. Serve over rice or noodles." },
  { name: "French Onion Soup", ingredients: ["onions","butter","broth","bread","cheese"], requires: ["onions"], description: "Rich caramelized onion soup.", time: "45 min", instructions: "1. Slice onions thinly. Melt butter in a heavy pot over medium-low heat.\n2. Add onions and cook slowly for 25-30 minutes until deep golden brown.\n3. Pour in broth and simmer for 10 minutes.\n4. Season with salt and pepper.\n5. Ladle into oven-safe bowls, top with toasted bread.\n6. Cover with shredded cheese and broil until bubbly.\n7. Serve immediately." },
  { name: "Potato Hash", ingredients: ["potatos","onions","eggs","butter"], requires: ["potatos"], description: "Crispy pan-fried potatoes with onions.", time: "20 min", instructions: "1. Dice potatoes into small cubes.\n2. Heat butter in a large skillet over medium-high heat.\n3. Add potatoes in a single layer and press down.\n4. Cook without stirring for 5-7 minutes until golden.\n5. Flip and add diced onions.\n6. Cook another 5 minutes until crispy.\n7. Make wells and crack eggs into them.\n8. Cover and cook until eggs are set." },
  { name: "Mashed Potatoes", ingredients: ["potatos","butter","milk","salt"], requires: ["potatos"], description: "Creamy mashed potatoes.", time: "25 min", instructions: "1. Peel and cut potatoes into even chunks.\n2. Cover with cold salted water and bring to a boil.\n3. Cook for 15-18 minutes until fork-tender.\n4. Drain and return to hot pot for 1 minute to dry.\n5. Mash with a potato masher.\n6. Heat butter and milk together, then mix into potatoes.\n7. Season with salt and white pepper." },
  { name: "Berry Smoothie", ingredients: ["berries","milk","yogurt","banana","honey"], requires: ["berries"], description: "Blend up those berries before they go.", time: "5 min", instructions: "1. Add berries to blender.\n2. Add a banana for creaminess.\n3. Pour in milk.\n4. Add a spoonful of yogurt.\n5. Drizzle in honey to taste.\n6. Blend on high for 45-60 seconds until smooth.\n7. Pour into a glass and serve." },
  { name: "Glazed Carrots", ingredients: ["carrots","butter","honey","salt"], requires: ["carrots"], description: "Sweet butter-glazed carrots.", time: "15 min", instructions: "1. Peel and slice carrots into coins.\n2. Place in a pan with enough water to cover.\n3. Bring to a boil and cook for 5 minutes.\n4. Drain most water, leaving a few tablespoons.\n5. Add butter and honey.\n6. Toss carrots over medium heat for 3-4 minutes until glazed.\n7. Season with salt and serve." },
  { name: "Carrot Soup", ingredients: ["carrots","onions","butter","cream","broth"], requires: ["carrots"], description: "Smooth warming carrot soup.", time: "30 min", instructions: "1. Chop carrots and onions roughly.\n2. Melt butter in a pot, add onions and cook for 5 minutes.\n3. Add carrots and cook another 3 minutes.\n4. Pour in broth to cover.\n5. Simmer for 15-20 minutes until carrots are very soft.\n6. Blend until completely smooth.\n7. Stir in cream, season with salt, pepper, and ginger." },
  { name: "Egg Fried Rice", ingredients: ["eggs","rice","carrots","onions","soy sauce"], requires: ["eggs","rice"], description: "Satisfying fried rice with eggs and vegetables.", time: "20 min", instructions: "1. Use day-old cold rice if possible.\n2. Dice carrots small and chop onions.\n3. Heat oil in a wok over high heat.\n4. Fry onions and carrots for 3 minutes.\n5. Push to the side, crack in eggs, and scramble.\n6. Add rice and break up any clumps.\n7. Add soy sauce and toss over high heat for 3-4 minutes." },
  { name: "Deviled Eggs", ingredients: ["eggs","mayonaise","mustard","paprika"], requires: ["eggs","mayonaise"], description: "Classic deviled eggs.", time: "20 min", instructions: "1. Boil eggs for exactly 10 minutes, then transfer to ice water.\n2. Peel eggs and slice in half lengthwise.\n3. Remove yolks into a bowl.\n4. Mash yolks with mayonnaise, mustard, salt and pepper.\n5. Spoon filling back into the egg white halves.\n6. Dust with paprika and refrigerate until ready to serve." },
  { name: "Shakshuka", ingredients: ["eggs","tomatoes","onions","garlic","ketchup"], requires: ["eggs"], description: "Eggs poached in spiced tomato sauce.", time: "25 min", instructions: "1. Heat olive oil in a wide pan over medium heat.\n2. Saute diced onion for 5 minutes until soft.\n3. Add minced garlic and cook 1 minute.\n4. Add chopped tomatoes and ketchup.\n5. Season with cumin, paprika, salt and chili flakes.\n6. Simmer sauce for 10 minutes until thickened.\n7. Make wells and crack eggs into them.\n8. Cover and cook 5-8 minutes until whites are set.\n9. Serve with crusty bread." },
  { name: "Roasted Vegetables", ingredients: ["carrots","potatos","onions","garlic","oil"], requires: ["carrots","potatos"], description: "Roast everything together for an easy hearty dish.", time: "40 min", instructions: "1. Preheat oven to 425F.\n2. Cut carrots, potatoes, and onions into similar-sized chunks.\n3. Toss with olive oil, salt, pepper, and garlic.\n4. Spread in a single layer on a baking sheet.\n5. Roast for 20 minutes, then flip vegetables.\n6. Roast another 15-20 minutes until golden and caramelized.\n7. Sprinkle with fresh herbs and serve hot." },
  { name: "Ketchup Glazed Chicken", ingredients: ["ketchup","chicken","garlic","onions"], requires: ["ketchup"], description: "Simple ketchup-glazed chicken.", time: "35 min", instructions: "1. Mix ketchup with garlic, vinegar, and brown sugar.\n2. Season chicken with salt and pepper.\n3. Heat oil in an oven-safe pan over medium-high heat.\n4. Sear chicken for 3-4 minutes per side.\n5. Pour glaze over the chicken.\n6. Bake at 375F for 20-25 minutes.\n7. Rest 5 minutes before serving." },
  { name: "Onion Soup Pasta", ingredients: ["onions","pasta","butter","cheese"], requires: ["onions"], description: "Simple pasta with caramelized onions and cheese.", time: "25 min", instructions: "1. Slice onions thinly and cook in butter over low heat for 15-20 minutes until golden.\n2. Cook pasta in well-salted boiling water.\n3. Reserve 1 cup of pasta water before draining.\n4. Add pasta to the onions and toss.\n5. Add pasta water a splash at a time to create a sauce.\n6. Season well with salt and pepper.\n7. Serve topped with grated cheese." },
  { name: "Scrambled Eggs on Toast", ingredients: ["eggs","butter","bread","milk"], requires: ["eggs"], description: "Perfect creamy scrambled eggs.", time: "8 min", instructions: "1. Crack eggs into a cold pan, add butter and a splash of milk.\n2. Place over low-medium heat and stir continuously.\n3. Keep stirring, bringing the curds together slowly.\n4. Remove from heat while still slightly underdone.\n5. Season with salt and pepper.\n6. Toast and butter bread.\n7. Pile eggs onto toast and serve immediately." },
  { name: "Frittata", ingredients: ["eggs","onions","carrots","cheese","butter"], requires: ["eggs"], description: "Italian baked omelette great for using up vegetables.", time: "25 min", instructions: "1. Preheat oven to 375F.\n2. Saute any vegetables in an oven-safe pan until softened.\n3. Whisk eggs with salt, pepper, and a splash of cream.\n4. Pour egg mixture over the vegetables.\n5. Cook on stovetop for 3-4 minutes until edges are set.\n6. Transfer to oven and bake 10-12 minutes until puffed and golden.\n7. Let cool slightly, slice like a pizza and serve." },
  { name: "Mayonnaise Roasted Potatoes", ingredients: ["potatos","mayonaise","garlic"], requires: ["potatos","mayonaise"], description: "Incredibly crispy roasted potatoes using the mayo trick.", time: "45 min", instructions: "1. Preheat oven to 425F.\n2. Cut potatoes into wedges or chunks.\n3. Toss thoroughly with mayonnaise, garlic, salt, and pepper.\n4. Spread on a baking sheet in a single layer.\n5. Roast for 20 minutes until golden on the bottom.\n6. Flip and roast another 15 minutes until crispy all over.\n7. Serve with ketchup or sour cream." },
  { name: "Ribeye Steak", ingredients: ["ribeye","butter","garlic","thyme"], requires: ["ribeye"], description: "Perfect pan-seared ribeye with garlic butter.", time: "20 min", instructions: "1. Take steak out of fridge 30 minutes before cooking.\n2. Pat dry and season with salt and pepper.\n3. Heat cast iron skillet until smoking.\n4. Sear 3-4 minutes per side.\n5. Add butter, garlic, and thyme.\n6. Baste continuously for 1-2 minutes.\n7. Rest 5 minutes before slicing.", temps: [{"label":"Rare","temp":"125F","color":"bg-red-100 text-red-800"},{"label":"Medium Rare","temp":"135F","color":"bg-orange-100 text-orange-800"},{"label":"Medium","temp":"145F","color":"bg-yellow-100 text-yellow-800","safe":true},{"label":"Well Done","temp":"160F","color":"bg-green-100 text-green-800","safe":true}] },
  { name: "Roast Chicken", ingredients: ["chicken","butter","garlic","thyme"], requires: ["chicken"], description: "Classic roast chicken with crispy skin.", time: "90 min", instructions: "1. Preheat oven to 425F.\n2. Pat chicken dry inside and out.\n3. Rub all over with butter, salt, pepper, and garlic.\n4. Roast breast side up for 60-75 minutes.\n5. Baste every 20 minutes.\n6. Rest 10 minutes before carving.", temps: [{"label":"USDA Safe Minimum","temp":"165F","color":"bg-green-100 text-green-800","safe":true}] },
  { name: "Pan Seared Salmon", ingredients: ["salmon","butter","lemon","garlic"], requires: ["salmon"], description: "Crispy skin salmon with lemon butter.", time: "15 min", instructions: "1. Pat salmon dry and season with salt and pepper.\n2. Heat oil over medium-high heat.\n3. Place skin side down and press gently.\n4. Cook 4-5 minutes until skin is crispy.\n5. Flip and cook 2-3 more minutes.\n6. Add butter and lemon juice and serve.", temps: [{"label":"Safe Minimum","temp":"145F","color":"bg-green-100 text-green-800","safe":true}] },
];

function daysUntil(dateString) {
  if (!dateString) return null;
  const today = new Date();
  const target = new Date(dateString + "T00:00:00");
  return Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

function suggestRecipes(trackedItems) {
  if (!trackedItems || trackedItems.length === 0) return [];
  const itemNames = trackedItems.map((it) => it.name.toLowerCase().trim());
  const scored = RECIPE_DB.map((recipe) => {
    const hasRequired = recipe.requires.every((req) =>
      itemNames.some((item) => item.includes(req) || req.includes(item))
    );
    if (!hasRequired) return null;
    const usedItems = trackedItems.filter((it) =>
      recipe.ingredients.some((ing) => it.name.toLowerCase().includes(ing) || ing.includes(it.name.toLowerCase()))
    );
    const urgencyScore = usedItems.reduce((sum, it) => {
      const days = daysUntil(it.useByDate);
      return days !== null ? sum + Math.max(0, 30 - days) : sum;
    }, 0);
    return { ...recipe, urgencyScore, usedItems };
  }).filter(Boolean);
  scored.sort((a, b) => b.urgencyScore - a.urgencyScore);
  return scored.slice(0, 5);
}

function loadItems() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return parsed.map((it) => ({
      id: it.id ?? crypto.randomUUID(),
      name: (it.name ?? "").trim(),
      useByDate: it.useByDate ?? "",
      openDate: it.openDate ?? "",
      category: it.category ?? "Other",
      quantity: it.quantity ?? "",
      location: it.location ?? "Fridge",
    }));
  } catch (e) { return []; }
}

function saveItems(items) {
  const sorted = [...items].sort((a, b) => {
    const da = a.useByDate ? new Date(a.useByDate + "T00:00:00").getTime() : Infinity;
    const db = b.useByDate ? new Date(b.useByDate + "T00:00:00").getTime() : Infinity;
    return da - db;
  });
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(sorted)); } catch (e) {}
}

function loadCommunity() {
  try {
    const raw = localStorage.getItem(COMMUNITY_KEY);
    return raw ? JSON.parse(raw) : { recipes: [], tips: [], chat: [] };
  } catch (e) { return { recipes: [], tips: [], chat: [] }; }
}

function saveCommunity(data) {
  try { localStorage.setItem(COMMUNITY_KEY, JSON.stringify(data)); } catch (e) {}
}

function loadShopping() {
  try {
    const raw = localStorage.getItem(SHOPPING_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) { return []; }
}

function saveShopping(items) {
  try { localStorage.setItem(SHOPPING_KEY, JSON.stringify(items)); } catch (e) {}
}

function loadMeals() {
  try {
    const raw = localStorage.getItem(MEAL_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) { return {}; }
}

function saveMeals(meals) {
  try { localStorage.setItem(MEAL_KEY, JSON.stringify(meals)); } catch (e) {}
}

const DAYS = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
const MEAL_SLOTS = ["Breakfast","Lunch","Dinner"];

const CATEGORY_COLORS = {
  Produce: "bg-green-100 text-green-800",
  Dairy: "bg-blue-100 text-blue-800",
  Meat: "bg-red-100 text-red-800",
  Pantry: "bg-yellow-100 text-yellow-800",
  Leftovers: "bg-purple-100 text-purple-800",
  Other: "bg-gray-100 text-gray-700",
};

const LOCATION_COLORS = {
  Fridge: "bg-sky-100 text-sky-700",
  Freezer: "bg-cyan-100 text-cyan-800",
  Pantry: "bg-amber-100 text-amber-800",
};

const LOCATION_ICONS = {
  Fridge: "🧊",
  Freezer: "❄️",
  Pantry: "🗄️",
};

function Card({ children, className = "" }) {
  return <div className={`rounded-2xl border border-green-900/20 bg-white/95 backdrop-blur-sm p-5 card-3d ${className}`}>{children}</div>;
}

function TabBar({ active, onChange }) {
  return (
    <div className="flex gap-1 rounded-2xl bg-gradient-to-r from-green-900 to-emerald-800 p-1.5 shadow-lg">
      {[["tracker","🥦 Tracker"],["recipes","🍳 Recipes"],["shopping","🛒 Shopping"],["meals","📅 Meals"],["community","👥 Community"]].map(([id, label]) => (
        <button key={id} onClick={() => onChange(id)} className={`flex-1 rounded-xl py-2 text-xs font-bold transition-all duration-300 ${active === id ? "bg-white text-green-800 pill-3d-active scale-[1.02]" : "text-green-100/70 hover:text-white hover:bg-white/10 pill-3d"}`}>{label}</button>
      ))}
    </div>
  );
}

function BarcodeScanner({ onDetected }) {
  const videoRef = useRef(null);
  const [error, setError] = useState("");
  const detectedRef = useRef(false);
  const readerRef = useRef(null);

  useEffect(() => {
    detectedRef.current = false;
    async function startScanner() {
if (readerRef.current) { readerRef.current.reset(); readerRef.current = null; }
      try {
        const { BrowserMultiFormatReader } = await import("@zxing/library");
        readerRef.current = new BrowserMultiFormatReader();
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment", focusMode: "continuous", width: { ideal: 1280 }, height: { ideal: 720 } } }); if (videoRef.current) { videoRef.current.srcObject = stream; await videoRef.current.play(); }
        
        await readerRef.current.decodeFromStream(videoRef.current.srcObject, videoRef.current, (result, err) => {
          if (result && !detectedRef.current) {
            detectedRef.current = true;
            if (readerRef.current) readerRef.current.reset();
            onDetected(result.getText());
          }
        });
      } catch (e) {
        setError("Camera access denied or not available. Please allow camera access.");
      }
    }
    startScanner();
    return () => { if (readerRef.current) { readerRef.current.reset(); readerRef.current = null; } if (videoRef.current && videoRef.current.srcObject) { videoRef.current.srcObject.getTracks().forEach(t => t.stop()); videoRef.current.srcObject = null; } };
  }, []);

  return (
    <div className="relative">
      {error ? (
        <p className="text-sm text-red-600">{error}</p>
      ) : (
        <div className="relative overflow-hidden rounded-lg bg-black">
          <video ref={videoRef} className="w-full rounded-lg" style={{ height: "240px", objectFit: "cover" }} />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="border-2 border-red-400 rounded w-48 h-24 opacity-70" />
          </div>
          <p className="absolute bottom-2 left-0 right-0 text-center text-xs text-white bg-black/40 py-1">Point at barcode</p>
        </div>
      )}
    </div>
  );
}

function MealSearchInput({ value, onChange, onKeyDown }) {
  const ref = useRef(null);
  useEffect(() => { if (ref.current) ref.current.focus(); }, []);
  return (
    <input
      ref={ref}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder="Search recipes or type your own..."
      className="flex-1 rounded border px-3 py-2 text-sm text-gray-900"
    />
  );
}

function FoodAutocomplete({ value, onChange, onSelect }) {
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(0);
  const ref = useRef(null);

  const matches = useMemo(() => {
    if (!value || value.length < 1) return [];
    const q = value.toLowerCase();
    return FOOD_DB.filter((f) => f.name.toLowerCase().includes(q)).slice(0, 8);
  }, [value]);

  useEffect(() => { setHighlighted(0); }, [matches]);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleKeyDown = (e) => {
    if (!open || matches.length === 0) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setHighlighted((h) => Math.min(h + 1, matches.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setHighlighted((h) => Math.max(h - 1, 0)); }
    else if (e.key === "Enter") { e.preventDefault(); onSelect(matches[highlighted]); setOpen(false); }
    else if (e.key === "Escape") { setOpen(false); }
  };

  return (
    <div className="relative" ref={ref}>
      <input
        value={value}
        onChange={(e) => { onChange(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        onKeyDown={handleKeyDown}
        placeholder="e.g. Chicken Breast"
        className="w-full rounded border px-3 py-2 text-sm text-gray-900"
      />
      {open && matches.length > 0 && (
        <div className="absolute z-50 mt-1 w-full rounded-lg border bg-white shadow-lg">
          {matches.map((f, i) => (
            <button
              key={f.name}
              onMouseDown={() => { onSelect(f); setOpen(false); }}
              onMouseEnter={() => setHighlighted(i)}
              className={`flex w-full items-center justify-between px-3 py-2 text-left text-sm ${highlighted === i ? "bg-green-50" : "hover:bg-green-50"}`}
            >
              <span>{f.name}</span>
              <div className="flex items-center gap-1">
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${LOCATION_COLORS[f.location]}`}>{LOCATION_ICONS[f.location]} {f.location}</span>
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${CATEGORY_COLORS[f.category]}`}>{f.category}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}


function CommunityStewAnim() {
  const [phase, setPhase] = React.useState("dance");
  const chars = [
    { emoji: "🥕", left: "calc(50% - 80px)", delay: "0s" },
    { emoji: "🥦", left: "calc(50% - 40px)", delay: "0.15s" },
    { emoji: "🍗", left: "calc(50%)", delay: "0.3s" },
    { emoji: "🥩", left: "calc(50% + 40px)", delay: "0.1s" },
    { emoji: "🌽", left: "calc(50% + 80px)", delay: "0.2s" },
    { emoji: "🧅", left: "calc(50% - 60px)", delay: "0.25s", top: true },
    { emoji: "🍅", left: "calc(50% + 60px)", delay: "0.05s", top: true },
  ];

  React.useEffect(() => {
    const t1 = setTimeout(() => setPhase("jump"), 3500);
    const t2 = setTimeout(() => setPhase("done"), 5500);
    const t3 = setTimeout(() => setPhase("dance"), 7500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [phase]);

  if (phase === "done") return null;

  return (
    <>
      {chars.map((ch, i) => (
        <div
          key={i}
          className={`food-char ${i % 2 === 0 ? "" : "r"} ${phase === "jump" ? "jump" : ""}`}
          style={{
            left: ch.left,
            bottom: ch.top ? "130px" : "95px",
            animationDelay: phase === "jump" ? `${i * 0.15}s` : ch.delay,
            fontSize: "32px"
          }}
        >
          {ch.emoji}
        </div>
      ))}

      {/* FLOATING LANGUAGE BUTTON */}
      <button onClick={() => changeLang(lang === "en" ? "es" : "en")} className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-green-500 text-white shadow-xl hover:bg-green-600 hover:scale-110 transition-all flex items-center justify-center text-xl font-bold border-2 border-white" style={{ boxShadow: "0 4px 20px rgba(34,197,94,0.4)" }}>
        {lang === "en" ? "🇲🇽" : "🇺🇸"}
      </button>
    </>
  );
}

export default function TrackFreshDashboard() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [pwInput, setPwInput] = useState("");
  const [pwError, setPwError] = useState(false);
  const handlePwSubmit = () => {
    if (pwInput === "fresh2026" || pwInput === "CarlosG2026") { setIsUnlocked(true); setPwError(false); try { sessionStorage.setItem("tf_ok", "1"); } catch(e) {} } else { setPwError(true); }
  };
  React.useEffect(() => { try { if (sessionStorage.getItem("tf_ok") === "1") setIsUnlocked(true); } catch(e) {} }, []);
  const [activeTab, setActiveTab] = useState("home");
  const [burstingBubble, setBurstingBubble] = useState(null);
  const handleBubbleTap = (target) => {
    setBurstingBubble(target);
    setTimeout(() => {
      setActiveTab(target);
      setBurstingBubble(null);
    }, 550);
  };
  const [trackedItems, setTrackedItems] = useState([]);
  const [itemName, setItemName] = useState("");
  const [useByDate, setUseByDate] = useState("");
  const [openDate, setOpenDate] = useState("");
  const [category, setCategory] = useState("Other");
  const [quantity, setQuantity] = useState("");
  const [location, setLocation] = useState("Fridge");
  const [showAlert, setShowAlert] = useState(false);
  const [alertItem, setAlertItem] = useState({ name: "", daysLeft: 0 });
  const [editingItem, setEditingItem] = useState(null);
  const [showHelp, setShowHelp] = useState(false);
  const [recipeSuggestions, setRecipeSuggestions] = useState([]);
  const [recipesGenerated, setRecipesGenerated] = useState(false);
  const [expandedRecipe, setExpandedRecipe] = useState(null);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [username, setUsername] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  const [community, setCommunity] = useState({ recipes: [], tips: [], chat: [] });
  const [communityTab, setCommunityTab] = useState("chat");
  const [newRecipeTitle, setNewRecipeTitle] = useState("");
  const [newRecipeBody, setNewRecipeBody] = useState("");
  const [newTip, setNewTip] = useState("");
  const [newChat, setNewChat] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterLocation, setFilterLocation] = useState("All");
  const [shoppingItems, setShoppingItems] = useState([]);
  const [newShoppingItem, setNewShoppingItem] = useState("");
  const [newShoppingQty, setNewShoppingQty] = useState("");
  const [selectedReceiptItems, setSelectedReceiptItems] = useState([]);
  const [showLabelScanner, setShowLabelScanner] = useState(false);
  const [labelItem, setLabelItem] = useState(null);
  const [labelScanning, setLabelScanning] = useState(false);
  const [labelError, setLabelError] = useState("");
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [quickAddName, setQuickAddName] = useState("");
  const [quickAddDate, setQuickAddDate] = useState("");
  const [quickAddQty, setQuickAddQty] = useState("");
  const [quickAddCategory, setQuickAddCategory] = useState("Other");
  const [quickAddLocation, setQuickAddLocation] = useState("Fridge");
  const [meals, setMeals] = useState({});
  const [showMealPicker, setShowMealPicker] = useState(false);
  const [mealPickerDay, setMealPickerDay] = useState("");
  const [mealPickerSlot, setMealPickerSlot] = useState("");
  const [mealPickerSearch, setMealPickerSearch] = useState("");
  const [aiPlanLoading, setAiPlanLoading] = useState(false);
  const [quickVoiceListening, setQuickVoiceListening] = useState("");
  const [quickVoiceError, setQuickVoiceError] = useState("");
  const [showBarcodeScanner, setShowBarcodeScanner] = useState(false);
  const [barcodeScanKey, setBarcodeScanKey] = useState(0);
  const [barcodeItem, setBarcodeItem] = useState(null);
  const [barcodeScanning, setBarcodeScanning] = useState(false);
  const [barcodeError, setBarcodeError] = useState("");
  const [barcodeDetected, setBarcodeDetected] = useState("");
  const [barcodeLocation, setBarcodeLocation] = useState("");
  const [barcodeUseBy, setBarcodeUseBy] = useState("");
  const [barcodeFreezeBy, setBarcodeFreezeBy] = useState("");
  const [voiceListening, setVoiceListening] = useState("");
  const [voiceError, setVoiceError] = useState("");
  const [showReceiptScanner, setShowReceiptScanner] = useState(false);
  const [receiptScanning, setReceiptScanning] = useState(false);
  const [receiptItems, setReceiptItems] = useState([]);
  const [receiptError, setReceiptError] = useState("");
  const [showWelcome, setShowWelcome] = useState(false);
  useEffect(() => { if (!localStorage.getItem("trackfresh.welcomed")) setShowWelcome(true); }, []);
  useEffect(() => {
    if (trackedItems.length === 0) return;
    const urgent = trackedItems.filter(it => it.daysLeft !== null && it.daysLeft <= 2);
    if (urgent.length > 0) { setAlertItem({ name: urgent[0].name, daysLeft: urgent[0].daysLeft }); setShowAlert(true); }
  }, [trackedItems.length]);

  useEffect(() => {
    setTrackedItems(loadItems());
    setCommunity(loadCommunity());
    setShoppingItems(loadShopping());
    setMeals(loadMeals());
    const savedName = localStorage.getItem(USERNAME_KEY);
    if (savedName) setUsername(savedName);
  }, []);
  useEffect(() => { saveItems(trackedItems); }, [trackedItems]);
  useEffect(() => { saveCommunity(community); }, [community]);
  useEffect(() => { saveShopping(shoppingItems); }, [shoppingItems]);
  useEffect(() => { saveMeals(meals); }, [meals]);

  const handleSetMeal = (day, slot, meal) => {
    setMeals((prev) => ({ ...prev, [`${day}-${slot}`]: meal }));
    setShowMealPicker(false);
    setMealPickerSearch("");
  };

  const handleClearMeal = (day, slot) => {
    setMeals((prev) => { const next = { ...prev }; delete next[`${day}-${slot}`]; return next; });
  };

  const handleAiPlanWeek = async () => {
    setAiPlanLoading(true);
    try {
      const expiringNames = itemsWithCountdown.filter((it) => it.daysLeft !== null && it.daysLeft <= 7).map((it) => it.name).join(", ");
      const allItems = trackedItems.map((it) => it.name).join(", ");
      const res = await fetch("/api/plan-meals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ expiring: expiringNames, available: allItems })
      });
      const data = await res.json();
      if (data.plan) setMeals(data.plan);
    } catch (err) { console.error(err); }
    setAiPlanLoading(false);
  };

  const handleAddMealIngredientsToShopping = (mealName) => {
    const onList = shoppingItems.some((s) => s.name.toLowerCase() === mealName.toLowerCase());
    if (onList) { window.alert(mealName + " is already on your shopping list!"); return; }
    setShoppingItems((prev) => [...prev, { id: crypto.randomUUID(), name: "Ingredients for: " + mealName, qty: "", checked: false, forMeal: mealName }]);
    setActiveTab("shopping");
  };

  const itemsWithCountdown = useMemo(() => trackedItems.map((it) => ({ ...it, daysLeft: daysUntil(it.useByDate) })), [trackedItems]);

  const filteredItems = useMemo(() => {
    return itemsWithCountdown.filter((it) => {
      const catOk = filterCategory === "All" || (it.category ?? "Other") === filterCategory;
      const locOk = filterLocation === "All" || (it.location ?? "Fridge") === filterLocation;
      return catOk && locOk;
    });
  }, [itemsWithCountdown, filterCategory, filterLocation]);

  const expiringSoon = useMemo(() => {
    return itemsWithCountdown.filter((it) => it.daysLeft !== null && it.daysLeft <= 7);
  }, [itemsWithCountdown]);

  const handleAddItem = () => {
    const name = itemName.trim();
    if (!name) return;
    if (name.toLowerCase().startsWith("alexa:")) {
      const spokenItem = name.replace(/alexa:/i, "").trim();
      const today = new Date();
      const useBy = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
      setTrackedItems((prev) => [...prev, { id: crypto.randomUUID(), name: spokenItem, useByDate: useBy.toISOString().split("T")[0], openDate: today.toISOString().split("T")[0], category: "Other", quantity: labelItem.weight || "", location: "Fridge" }]);
      window.alert("Alexa: Tracking " + spokenItem + " opened today, expires in 30 days.");
      setItemName(""); return;
    }
    if (!useByDate) { window.alert("Please enter a Use By date."); return; }
    const daysLeft = daysUntil(useByDate);
    if (daysLeft !== null && daysLeft <= 3) { setAlertItem({ name, daysLeft }); setShowAlert(true); }
    setTrackedItems((prev) => [...prev, { id: crypto.randomUUID(), name, useByDate, openDate, category, quantity, location }]);
    setItemName(""); setUseByDate(""); setOpenDate(""); setCategory("Other"); setQuantity(""); setLocation("Fridge");
  };

  const handleRemoveItem = (id) => setTrackedItems((prev) => prev.filter((it) => it.id !== id));

  const handleEditItem = (id) => { const item = trackedItems.find(it => it.id === id); if (item) setEditingItem({ ...item }); };
  const handleSaveEdit = () => { if (!editingItem) return; setTrackedItems(prev => prev.map(it => it.id === editingItem.id ? { ...editingItem } : it)); setEditingItem(null); };

  const handleUseTodayItem = (id) => setTrackedItems((prev) => prev.filter((it) => it.id !== id));

  const [recipesLoading, setRecipesLoading] = useState(false);
  const handleSuggestRecipes = async () => {
    if (trackedItems.length === 0) { window.alert("Add some food items first!"); return; }
    setRecipesLoading(true);
    setRecipesGenerated(false);
    setRecipeSuggestions([]);
    setExpandedRecipe(null);
    try {
      const res = await fetch("/api/suggest-recipes", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ items: trackedItems.map(it => ({ name: it.name, daysLeft: it.daysLeft, category: it.category, location: it.location })) }) });
      const data = await res.json();
      if (data.error) { window.alert("Recipe error: " + data.error); setRecipesLoading(false); return; }
      setRecipeSuggestions(data.recipes || []);
      setRecipesGenerated(true);
    } catch (e) { window.alert("Failed to get recipes. Try again."); }
    setRecipesLoading(false);
  };

  const handleSaveRecipeToCommunity = (recipe) => {
    if (savedRecipes.includes(recipe.name)) return;
    const entry = {
      id: crypto.randomUUID(),
      author: username || "Anonymous",
      title: recipe.name,
      body: recipe.description + "\n\nInstructions:\n" + recipe.instructions + "\n\nCook time: " + recipe.time,
      date: new Date().toLocaleDateString()
    };
    setCommunity((prev) => ({ ...prev, recipes: [entry, ...prev.recipes] }));
    setSavedRecipes((prev) => [...prev, recipe.name]);
  };

  const handleAddShoppingItem = () => {
    const name = newShoppingItem.trim();
    if (!name) return;
    setShoppingItems((prev) => [...prev, { id: crypto.randomUUID(), name, qty: newShoppingQty.trim(), checked: false }]);
    setNewShoppingItem(""); setNewShoppingQty("");
  };

  const handleToggleShoppingItem = (id) => setShoppingItems((prev) => prev.map((it) => it.id === id ? { ...it, checked: !it.checked } : it));
  const handleRemoveShoppingItem = (id) => setShoppingItems((prev) => prev.filter((it) => it.id !== id));
  const handleClearChecked = () => setShoppingItems((prev) => prev.filter((it) => !it.checked));
  const handleAddToShoppingFromTracker = (item) => {
    const already = shoppingItems.some((s) => s.name.toLowerCase() === item.name.toLowerCase());
    if (already) return;
    setShoppingItems((prev) => [...prev, { id: crypto.randomUUID(), name: item.name, qty: "", checked: false }]);
  };

  const handleScanReceipt = async (file) => {
    setReceiptScanning(true);
    setReceiptError("");
    setReceiptItems([]);
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64 = e.target.result.split(",")[1];
        const mediaType = file.type;
        const res = await fetch("/api/scan-receipt", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ image: base64, mimeType: mediaType }) });
        const data = await res.json();
        if (data.error) { setReceiptError(data.error); setReceiptScanning(false); return; }
        setReceiptItems(data.items);
        setSelectedReceiptItems(data.items.map((_, i) => i));
        setReceiptScanning(false);
      };
      reader.readAsDataURL(file);
    } catch (err) { setReceiptError(err.message); setReceiptScanning(false); }
  };

  const handleBarcodeDetected = async (barcode) => {
    if (barcodeDetected === barcode || barcodeScanning) return;
    const alreadyTracked = trackedItems.find((it) => it.barcode === barcode);
    if (alreadyTracked) { setBarcodeError("⚠️ " + alreadyTracked.name + " was already scanned and is in your tracker!"); return; }
    setBarcodeDetected(barcode);
    setBarcodeScanning(true);
    setBarcodeError("");
    try {
      const res = await fetch("/api/scan-barcode", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ barcode }) });
      const data = await res.json();
      if (data.error) { setBarcodeError("Barcode: " + barcode + " — not found in database. Try a different product."); setBarcodeScanning(false); setBarcodeDetected(""); return; }
      setBarcodeItem({ ...data.item, barcode });
      setBarcodeScanning(false);
} catch (err) { setBarcodeError("Scan failed. Please try again."); setBarcodeScanning(false); setBarcodeDetected(""); }
  };

  const handleAddBarcodeItem = () => {
    if (!barcodeItem) return;
    const loc = barcodeLocation || barcodeItem.location;
    const today = new Date().toISOString().split("T")[0];
    setTrackedItems((prev) => [...prev, { id: crypto.randomUUID(), name: barcodeItem.name, category: barcodeItem.category, location: loc, quantity: "", useByDate: barcodeUseBy, openDate: today, freezeBy: barcodeFreezeBy, barcode: barcodeItem.barcode || "", daysAfterOpening: barcodeItem.daysAfterOpening || null, storageTip: barcodeItem.storageTip || "", openedTip: barcodeItem.openedTip || "" }]);
    setShowBarcodeScanner(false);
    setBarcodeItem(null);
    setBarcodeDetected("");
    setBarcodeLocation("");
    setBarcodeUseBy("");
    setBarcodeFreezeBy("");
    setVoiceError("");
  };

  const parseSpokenDate = (transcript) => {
    const months = { january:1, february:2, march:3, april:4, may:5, june:6, july:7, august:8, september:9, october:10, november:11, december:12, jan:1, feb:2, mar:3, apr:4, jun:6, jul:7, aug:8, sep:9, oct:10, nov:11, dec:12 };
    const t = transcript.toLowerCase().trim();
    const match = t.match(/([a-z]+)\s+(\d{1,2})\s*,?\s*(\d{4})/);
    if (match) {
      const month = months[match[1]];
      if (month) {
        const d = new Date(parseInt(match[3]), month - 1, parseInt(match[2]));
        return d.toISOString().split("T")[0];
      }
    }
    const match2 = t.match(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})/);
    if (match2) {
      const yr = match2[3].length === 2 ? "20" + match2[3] : match2[3];
      const d = new Date(parseInt(yr), parseInt(match2[1]) - 1, parseInt(match2[2]));
      return d.toISOString().split("T")[0];
    }
    return null;
  };

  const handleVoiceDate = (field) => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      setVoiceError("Voice not supported on this browser. Please type the date.");
      return;
    }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SR();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    setVoiceListening(field);
    setVoiceError("");
    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      const parsed = parseSpokenDate(transcript);
      if (parsed) {
        if (field === "useBy") setBarcodeUseBy(parsed);
        if (field === "freezeBy") setBarcodeFreezeBy(parsed);
        setVoiceListening("");
      } else {
        setVoiceError("Could not understand date. Try saying: February 20 2026");
        setVoiceListening("");
      }
    };
    recognition.onerror = () => { setVoiceError("Could not hear you. Please try again."); setVoiceListening(""); };
    recognition.onend = () => setVoiceListening("");
    recognition.start();
  };

  const handleFreezeItem = (id) => {
    setTrackedItems((prev) => prev.map((it) => {
      if (it.id !== id) return it;
      const newUseBy = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
      return { ...it, location: "Freezer", useByDate: newUseBy };
    }));
  };

  const handleQuickVoice = (field) => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      setQuickVoiceError("Voice not supported on this browser.");
      return;
    }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SR();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    setQuickVoiceListening(field);
    setQuickVoiceError("");
    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      if (field === "qty") {
        setQuickAddQty(transcript);
        setQuickVoiceListening("");
      } else {
        const parsed = parseSpokenDate(transcript);
        if (parsed) {
          setQuickAddDate(parsed);
          setQuickVoiceListening("");
        } else {
          setQuickVoiceError("Could not understand date. Try: February 20 2026");
          setQuickVoiceListening("");
        }
      }
    };
    recognition.onerror = () => { setQuickVoiceError("Could not hear you. Please try again."); setQuickVoiceListening(""); };
    recognition.onend = () => setQuickVoiceListening("");
    recognition.start();
  };

  const handleQuickAdd = async () => {
    if (!quickAddName.trim()) return;
    let foodInfo = {};
    try {
      const res = await fetch("/api/food-info", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: quickAddName }) });
      if (res.ok) foodInfo = await res.json();
    } catch (e) { console.log("Food info fetch failed, using defaults"); }
    const today = new Date();
    const useBy = quickAddDate || (foodInfo.daysSealed ? new Date(today.getTime() + foodInfo.daysSealed * 86400000).toISOString().split("T")[0] : "");
    const cat = quickAddCategory !== "Other" ? quickAddCategory : (foodInfo.category || quickAddCategory);
    const loc = quickAddLocation !== "Fridge" ? quickAddLocation : (foodInfo.location || quickAddLocation);
    setTrackedItems((prev) => [...prev, { id: crypto.randomUUID(), name: quickAddName, category: cat, location: loc, quantity: quickAddQty, useByDate: useBy, openDate: today.toISOString().split("T")[0], daysAfterOpening: foodInfo.daysAfterOpening || null, storageTip: foodInfo.storageTip || "", openedTip: foodInfo.openedTip || "" }]);
    setShowQuickAdd(false);
    setQuickAddName(""); setQuickAddDate(""); setQuickAddQty(""); setQuickAddCategory("Other"); setQuickAddLocation("Fridge");
  };

  const handleScanLabel = async (file) => {
    setLabelScanning(true);
    setLabelError("");
    setLabelItem(null);
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64 = e.target.result.split(",")[1];
        const mediaType = file.type;
        const res = await fetch("/api/scan-label", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ image: base64, mimeType: mediaType }) });
        const data = await res.json();
        if (data.error) { setLabelError(data.error); setLabelScanning(false); return; }
        
        const item = data.item;
        setLabelItem(item);
        
        if (!item.dateFound) {
          setLabelError("📅 No expiration date visible. Flip package over and scan the other side!");
        }
        
        setLabelScanning(false);
      };
      reader.readAsDataURL(file);
    } catch (err) { setLabelError(err.message); setLabelScanning(false); }
  };

  const handleAddLabelItem = () => {
    if (!labelItem) return;
    const quantity = labelItem.weight || "";
    setTrackedItems((prev) => [...prev, { 
      id: crypto.randomUUID(), 
      name: labelItem.name, 
      category: labelItem.category, 
      location: labelItem.location, 
      quantity: quantity,
      useByDate: labelItem.date || "", 
      openDate: new Date().toISOString().split("T")[0], 
      daysAfterOpening: labelItem.daysAfterOpening || null,
      storageTip: labelItem.storageTip || "",
      openedTip: labelItem.openedTip || ""
    }]);
    setShowLabelScanner(false);
    setLabelItem(null);
    setLabelError("");
  };

  const handleAddReceiptItems = () => {
    const toAdd = receiptItems.filter((_, i) => selectedReceiptItems.includes(i));
    const today = new Date();
    setTrackedItems((prev) => [...prev, ...toAdd.map((it) => {
      const days = it.daysSealed || 7;
      const useBy = new Date(today.getTime() + days * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
      return { id: crypto.randomUUID(), name: it.name, category: it.category, location: it.location, quantity: "", useByDate: useBy, openDate: today.toISOString().split("T")[0], daysAfterOpening: it.daysAfterOpening || null, storageTip: it.storageTip || "", openedTip: it.openedTip || "" };
    })]);
    setShowReceiptScanner(false);
    setReceiptItems([]);
    setSelectedReceiptItems([]);
  };

  const handleSetUsername = () => { const n = usernameInput.trim(); if (!n) return; setUsername(n); localStorage.setItem(USERNAME_KEY, n); setUsernameInput(""); };
  const handlePostRecipe = () => { if (!newRecipeTitle.trim() || !newRecipeBody.trim()) return; setCommunity((prev) => ({ ...prev, recipes: [{ id: crypto.randomUUID(), author: username, title: newRecipeTitle.trim(), body: newRecipeBody.trim(), date: new Date().toLocaleDateString() }, ...prev.recipes] })); setNewRecipeTitle(""); setNewRecipeBody(""); };
  const handlePostTip = () => { if (!newTip.trim()) return; setCommunity((prev) => ({ ...prev, tips: [{ id: crypto.randomUUID(), author: username, text: newTip.trim(), date: new Date().toLocaleDateString() }, ...prev.tips] })); setNewTip(""); };
  const handlePostChat = () => { if (!newChat.trim()) return; setCommunity((prev) => ({ ...prev, chat: [...prev.chat, { id: crypto.randomUUID(), author: username, text: newChat.trim(), time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }] })); setNewChat(""); };

    if (isUnlocked === false) return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{backgroundColor: "#faf7f2"}}>
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full text-center">
        <div className="text-4xl mb-3">🥦</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-1">FreshTrack<span className="text-green-600">.ai</span></h1>
        <p className="text-sm text-gray-500 mb-1">Beta Testing</p>
        <p className="text-xs text-gray-400 mb-6">Enter your access code to continue</p>
        <input type="password" value={pwInput} onChange={(e) => { setPwInput(e.target.value); setPwError(false); }} onKeyDown={(e) => e.key === "Enter" && handlePwSubmit()} placeholder="Access Code" className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-center text-lg text-gray-800 mb-3 focus:border-green-500 focus:outline-none" />
        {pwError && <p className="text-red-500 text-sm mb-3">Invalid code. Try again.</p>}
        <button onClick={handlePwSubmit} className="w-full rounded-xl py-3 text-white font-bold text-lg btn-green-3d">Enter Beta</button>
        <p className="text-xs text-gray-400 mt-4">Contact Freddie for access</p>
      </div>
    </div>
  );

    return (
    <>{showWelcome && (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-2xl animate-[fadeIn_0.4s_ease]">
          <div className="text-5xl mb-3">🥦</div>
          <h2 className="text-2xl font-bold text-green-700 mb-1">Welcome to FreshTrack.ai!</h2>
          <p className="text-gray-500 text-sm mb-4">The smart way to track your groceries, reduce food waste, and save money.</p>
          <div className="text-left bg-green-50 rounded-xl p-4 mb-4 space-y-2">
            <div className="flex items-center gap-2 text-sm"><span>📸</span><span className="text-gray-700">AI-powered label &amp; barcode scanning</span></div>
            <div className="flex items-center gap-2 text-sm"><span>⏰</span><span className="text-gray-700">Smart AI expiry predictions &amp; alerts</span></div>
            <div className="flex items-center gap-2 text-sm"><span>🎤</span><span className="text-gray-700">Voice-powered hands-free entry</span></div>
            <div className="flex items-center gap-2 text-sm"><span>🛒</span><span className="text-gray-700">AI-built smart shopping lists</span></div>
            <div className="flex items-center gap-2 text-sm"><span>❄️</span><span className="text-gray-700">AI freeze alerts save your food</span></div>
          </div>
          <p className="text-xs text-gray-400 mb-4">Your data is stored locally on your device. No account required.</p>
          <button onClick={() => { setShowWelcome(false); localStorage.setItem("trackfresh.welcomed", "true"); }} className="w-full rounded-full py-3 text-lg btn-green-3d">🚀 Get Started</button>
        </div>
      </div>
    )}

    <div className="min-h-screen bg-gradient-to-b from-green-50 via-emerald-50/50 to-white p-4"><style dangerouslySetInnerHTML={{__html: GLOBAL_STYLES}} />
      <div className="mx-auto max-w-2xl space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">🥦 TrackFresh</h1>
          <div className="flex items-center gap-3">
            <button onClick={() => setShowHelp(true)} className="text-sm font-semibold text-green-700 hover:text-green-600 transition-colors underline decoration-green-300">How to use</button>
            <button onClick={() => { if (window.confirm("Sign out of TrackFresh?")) { window.location.href = "https://logout@trackfresh.vercel.app"; } }} className="text-sm font-semibold text-green-600 hover:text-green-800 transition-colors">Sign Out</button>
          </div>
        </div>



        {activeTab === "home" && (
          <div className="flex flex-col items-center py-6">
            <p className="text-sm text-gray-600 mb-6">✨ Your AI-powered kitchen assistant</p>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="flex flex-col items-center gap-2">
                <button onClick={() => handleBubbleTap("tracker-menu")} className={`bubble-green ${burstingBubble === "tracker-menu" ? "bubble-burst" : ""}`}>
                  <span className="text-2xl">🥦</span>
                  <span className="text-xs font-bold mt-1">Tracker</span>
                </button>
                <p className="text-sm font-bold text-gray-700 text-center w-24">AI tracks your food & freshness</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <button onClick={() => handleBubbleTap("recipes")} className={`bubble-green ${burstingBubble === "recipes" ? "bubble-burst" : ""}`}>
                  <span className="text-2xl">🍳</span>
                  <span className="text-xs font-bold mt-1">Recipes</span>
                </button>
                <p className="text-sm font-bold text-gray-700 text-center w-24">AI recipes from your fridge</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <button onClick={() => handleBubbleTap("shopping")} className={`bubble-green ${burstingBubble === "shopping" ? "bubble-burst" : ""}`}>
                  <span className="text-2xl">🛒</span>
                  <span className="text-xs font-bold mt-1">Shopping</span>
                </button>
                <p className="text-sm font-bold text-gray-700 text-center w-24">Smart shopping with AI alerts</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <button onClick={() => handleBubbleTap("meals")} className={`bubble-green ${burstingBubble === "meals" ? "bubble-burst" : ""}`}>
                  <span className="text-2xl">📅</span>
                  <span className="text-xs font-bold mt-1">Meals</span>
                </button>
                <p className="text-sm font-bold text-gray-700 text-center w-24">AI plans meals from what you have</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <button onClick={() => handleBubbleTap("stores")} className={`bubble-green ${burstingBubble === "stores" ? "bubble-burst" : ""}`}>
                  <span className="text-2xl">🏪</span>
                  <span className="text-xs font-bold mt-1">Stores</span>
                </button>
                <p className="text-sm font-bold text-gray-700 text-center w-24">Shop your favorite stores</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <button onClick={() => handleBubbleTap("community")} className={`bubble-green ${burstingBubble === "community" ? "bubble-burst" : ""}`}>
                  <span className="text-2xl">👥</span>
                  <span className="text-xs font-bold mt-1">Community</span>
                </button>
                <p className="text-sm font-bold text-gray-700 text-center w-24">Connect & share with others</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "tracker-menu" && (
          <div className="flex flex-col items-center py-6">
            <button onClick={() => setActiveTab("home")} className="self-start flex items-center gap-1 text-sm font-semibold text-green-700 mb-4">
              <span>←</span> Back
            </button>
            <h2 className="text-lg font-bold text-gray-800 mb-1">✨ AI Food Scanner</h2>
            <p className="text-sm text-gray-500 mb-6">Choose how AI should add your items</p>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="flex flex-col items-center gap-2">
                <button onClick={() => { setBurstingBubble("receipt"); setTimeout(() => { setShowReceiptScanner(true); setActiveTab("tracker"); setBurstingBubble(null); }, 350); }} className="bubble-green">
                  <span className="text-2xl">📷</span>
                  <span className="text-xs font-bold mt-1">Receipt</span>
                </button>
                <p className="text-xs text-gray-500 text-center w-24">AI reads your receipt instantly</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <button onClick={() => { setBurstingBubble("barcode"); setTimeout(() => { setShowBarcodeScanner(true); setActiveTab("tracker"); setBurstingBubble(null); }, 350); }} className="bubble-green">
                  <span className="text-2xl">📦</span>
                  <span className="text-xs font-bold mt-1">Barcode</span>
                </button>
                <p className="text-xs text-gray-500 text-center w-24">AI identifies any product</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <button onClick={() => { setBurstingBubble("label"); setTimeout(() => { setShowLabelScanner(true); setActiveTab("tracker"); setBurstingBubble(null); }, 350); }} className="bubble-green">
                  <span className="text-2xl">🏷️</span>
                  <span className="text-xs font-bold mt-1">Label</span>
                </button>
                <p className="text-xs text-gray-500 text-center w-24">AI extracts label details</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <button onClick={() => { setBurstingBubble("quickadd"); setTimeout(() => { setShowQuickAdd(true); setActiveTab("tracker"); setBurstingBubble(null); }, 350); }} className="bubble-green">
                  <span className="text-2xl">✏️</span>
                  <span className="text-xs font-bold mt-1">Quick Add</span>
                </button>
                <p className="text-xs text-gray-500 text-center w-24">Quick add with AI autocomplete</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <button onClick={() => { setBurstingBubble("myitems"); setTimeout(() => { setActiveTab("tracker"); setBurstingBubble(null); }, 350); }} className={`bubble-green ${burstingBubble === "myitems" ? "bubble-burst" : ""}`}>
                  <span className="text-2xl">📋</span>
                  <span className="text-xs font-bold mt-1">My Items</span>
                </button>
                <p className="text-xs text-gray-500 text-center w-24">Your AI-monitored inventory</p>
              </div>
            </div>
          </div>
        )}

        {showReceiptScanner && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-lg">
              <h2 className="mb-2 text-lg font-bold">📷 Scan Receipt</h2>
              <p className="mb-4 text-sm text-gray-600">Upload a receipt photo and our AI will instantly identify every food item, category, and shelf life.</p>
              {!receiptScanning && receiptItems.length === 0 && (
                <div className="grid grid-cols-2 gap-3">
                  <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-green-300 bg-gradient-to-b from-green-50 to-green-100 p-6 btn-3d">
                    <span className="text-3xl mb-2">📸</span>
                    <span className="text-sm font-semibold text-green-700">Take Photo</span>
                    <span className="text-xs text-gray-500 mt-1">Open camera</span>
                    <input type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => e.target.files[0] && handleScanReceipt(e.target.files[0])} />
                  </label>
                  <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-green-400 bg-green-50 p-6 hover:bg-blue-100 transition-colors">
                    <span className="text-3xl mb-2">🖼️</span>
                    <span className="text-sm font-semibold text-green-700">Upload Photo</span>
                    <span className="text-xs text-gray-500 mt-1">From gallery</span>
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files[0] && handleScanReceipt(e.target.files[0])} />
                  </label>
                </div>
              )}
              {receiptScanning && (
                <div className="flex flex-col items-center py-8">
                  <div className="mb-3 text-3xl animate-spin">⏳</div>
                  <p className="text-sm text-gray-600">Claude is reading your receipt...</p>
                </div>
              )}
              {receiptError && <p className="mt-2 text-sm text-red-600">Error: {receiptError}</p>}
              {receiptItems.length > 0 && (
                <div>
                  <p className="mb-2 text-sm font-semibold text-gray-700">Found {receiptItems.length} items — select which to add:</p>
                  <div className="max-h-64 overflow-y-auto space-y-2 mb-4">
                    {receiptItems.map((it, i) => (
                      <div key={i} className="rounded-lg border px-3 py-2">
                        <div className="flex items-center gap-3">
                          <input type="checkbox" checked={selectedReceiptItems.includes(i)} onChange={() => setSelectedReceiptItems((prev) => prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i])} className="h-4 w-4 accent-green-600" />
                          <span className="flex-1 text-sm font-bold">{it.name}</span>
                          <span className="rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-700">{it.location}</span>
                          <span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600">{it.category}</span>
                        </div>
                        <div className="ml-7 mt-1 space-y-0.5">
                          <p className="text-xs text-green-700">📦 Sealed: ~{it.daysSealed || 7} days{it.daysAfterOpening ? " · 📂 After opening: ~" + it.daysAfterOpening + " days" : ""}</p>
                          {it.storageTip && <p className="text-xs text-gray-500">💡 {it.storageTip}</p>}
                          {it.openedTip && <p className="text-xs text-orange-600">⚠️ {it.openedTip}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                  <button onClick={handleAddReceiptItems} className="w-full rounded-xl py-2.5 text-sm btn-green-3d btn-3d">Add {selectedReceiptItems.length} Items to Tracker</button>
                </div>
              )}
              <button onClick={() => { setShowReceiptScanner(false); setReceiptItems([]); setReceiptError(""); }} className="mt-3 w-full rounded-xl border bg-gradient-to-b from-white to-gray-50 py-2 text-sm font-bold text-gray-600 pill-3d">Cancel</button>
            </div>
          </div>
        )}

        {showHelp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-lg">
              <h2 className="mb-2 text-lg font-bold">How to Use</h2>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>🔹 <strong>Tracker:</strong> AI searches 100+ items. Category and location auto-fill intelligently.</li>
                <li>🔹 Filter by 🧊 Fridge, ❄️ Freezer, or 🗄️ Pantry to see items by location.</li>
                <li>🔹 <strong>Recipes:</strong> AI suggests recipes based on what's in your kitchen.</li>
                <li>🔹 <strong>Shopping:</strong> Build your shopping list, check off items as you shop.</li>
                <li>🔹 <strong>Community:</strong> Share recipes, tips, and chat.</li>
                <li>🔹 Red = expires within 3 days. Yellow = within 7 days.</li>
              </ul>
              <button onClick={() => setShowHelp(false)} className="mt-4 rounded-xl px-4 py-2 text-sm btn-green-3d">Close</button>
            </div>
          </div>
        )}

        {editingItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
              <h2 className="mb-4 text-lg font-bold">✏️ Edit Item</h2>
              <div className="space-y-3">
                <div><label className="mb-1 block text-sm font-medium">Name</label><input type="text" value={editingItem.name} onChange={(e) => setEditingItem({...editingItem, name: e.target.value})} className="w-full rounded border px-3 py-2 text-sm" /></div>
                <div><label className="mb-1 block text-sm font-medium">Use By Date</label><input type="date" value={editingItem.useByDate} onChange={(e) => setEditingItem({...editingItem, useByDate: e.target.value})} className="w-full rounded border px-3 py-2 text-sm" /></div>
                <div><label className="mb-1 block text-sm font-medium">Quantity</label><input type="text" value={editingItem.quantity || ""} onChange={(e) => setEditingItem({...editingItem, quantity: e.target.value})} className="w-full rounded border px-3 py-2 text-sm" /></div>
                <div><label className="mb-1 block text-sm font-medium">Location</label><select value={editingItem.location || "Fridge"} onChange={(e) => setEditingItem({...editingItem, location: e.target.value})} className="w-full rounded border px-3 py-2 text-sm"><option>Fridge</option><option>Freezer</option><option>Pantry</option><option>Counter</option></select></div>
                <div><label className="mb-1 block text-sm font-medium">Category</label><select value={editingItem.category || "Other"} onChange={(e) => setEditingItem({...editingItem, category: e.target.value})} className="w-full rounded border px-3 py-2 text-sm"><option>Dairy</option><option>Meat</option><option>Produce</option><option>Bakery</option><option>Frozen</option><option>Pantry</option><option>Beverages</option><option>Condiments</option><option>Snacks</option><option>Other</option></select></div>
                <div className="flex gap-2 pt-2"><button onClick={handleSaveEdit} className="flex-1 rounded bg-green-500 py-2 text-sm font-semibold text-white">Save</button><button onClick={() => setEditingItem(null)} className="flex-1 rounded border py-2 text-sm font-semibold text-gray-600">Cancel</button></div>
              </div>
            </div>
          </div>
        )}
        {showAlert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
              <div className="mb-3 flex items-center gap-2"><Bell className="h-5 w-5 text-red-500 animate-bounce" /><h2 className="text-lg font-bold text-red-600">Expiring Soon!</h2></div>
              {(() => { const urgent = trackedItems.filter(it => it.daysLeft !== null && it.daysLeft <= 2); return urgent.length > 0 ? (
                <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
                  {urgent.map(it => (
                    <div key={it.id} className="flex items-center justify-between rounded-lg border border-red-200 bg-red-50 px-3 py-2">
                      <span className="text-sm font-semibold">{it.name}</span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${it.daysLeft <= 0 ? "bg-red-600 text-white" : "bg-red-100 text-red-800"}`}>{it.daysLeft <= 0 ? "EXPIRED" : it.daysLeft + " day" + (it.daysLeft === 1 ? "" : "s") + " left"}</span>
                    </div>
                  ))}
                </div>
              ) : <p className="text-sm text-gray-700 mb-4"><span className="font-semibold">{alertItem.name}</span> expires in <span className="font-semibold">{alertItem.daysLeft}</span> day{alertItem.daysLeft === 1 ? "" : "s"}.</p>; })()}
              <p className="text-xs text-gray-500 mb-3">Use these items soon, freeze them, or check for recipes!</p>
              <div className="flex gap-2">
                <button onClick={() => setShowAlert(false)} className="flex-1 rounded-lg bg-gradient-to-b from-red-500 to-red-600 py-2 text-sm font-bold text-white btn-3d">Got it</button>
                <button onClick={() => { setShowAlert(false); setActiveTab("recipes"); }} className="flex-1 rounded-lg border border-red-300 bg-gradient-to-b from-white to-red-50 py-2 text-sm font-bold text-red-600 pill-3d">Find Recipes</button>
              </div>
            </div>
          </div>
        )}

        {showBarcodeScanner && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-lg">
              <h2 className="mb-2 text-lg font-bold">📦 Scan Barcode</h2>
              <p className="mb-4 text-sm text-gray-600">Point your camera at the barcode on any food package.</p>
              {!barcodeItem && (
                <BarcodeScanner key={barcodeScanKey} onDetected={handleBarcodeDetected} />
              )}
              {barcodeScanning && (
                <div className="flex flex-col items-center py-4">
                  <div className="mb-3 text-3xl animate-spin">⏳</div>
                  <p className="text-sm text-gray-600">Looking up product...</p>
                </div>
              )}
              {barcodeError && (
                <div className="mt-2 rounded-lg bg-red-50 p-3">
                  <p className="text-sm text-red-600">{barcodeError}</p>
<button onClick={() => { setBarcodeError(""); setBarcodeDetected(""); setBarcodeItem(null); setBarcodeScanning(false); setShowBarcodeScanner(false); setTimeout(() => setShowBarcodeScanner(true), 1000); }} className="mt-2 text-xs text-green-700 underline">Try again</button>
                </div>
              )}
              {barcodeItem && (
                <div className="space-y-3">
                  <div className="rounded-lg border p-3 bg-green-50">
                    <p className="text-xs text-green-600 font-semibold mb-1">✅ Product found!</p>
                    <p className="font-bold text-gray-800">{barcodeItem.name}</p>
                    <p className="text-xs text-gray-500">{barcodeItem.category}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-2">Where are you storing this?</p>
                    <div className="grid grid-cols-2 gap-2">
                      <button onClick={() => { setBarcodeLocation("Fridge"); setBarcodeFreezeBy(""); }} className={`rounded-lg border-2 py-3 text-sm font-semibold transition-colors ${barcodeLocation === "Fridge" ? "border-green-500 bg-gradient-to-b from-green-50 to-green-100 text-green-700 pill-3d-active" : "border-gray-200 text-gray-600 pill-3d"}`}>🧊 Fridge{barcodeLocation === "Fridge" && <p className="text-xs font-normal mt-1">Use fresh</p>}</button>
                      <button onClick={() => setBarcodeLocation("Freezer")} className={`rounded-lg border-2 py-3 text-sm font-semibold transition-colors ${barcodeLocation === "Freezer" ? "border-cyan-500 bg-gradient-to-b from-cyan-50 to-cyan-100 text-cyan-700 pill-3d-active" : "border-gray-200 text-gray-600 pill-3d"}`}>❄️ Freezer{barcodeLocation === "Freezer" && <p className="text-xs font-normal mt-1">Long term storage</p>}</button>
                    </div>
                  </div>
                  {barcodeLocation && (
                    <div className="space-y-2">
                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">{barcodeLocation === "Freezer" ? "Freeze By Date" : "Use By Date"}</label>
                        <div className="flex gap-2">
                          <input type="date" value={barcodeUseBy} onChange={(e) => setBarcodeUseBy(e.target.value)} className="flex-1 rounded border px-3 py-2 text-sm text-gray-900" />
                          <button onClick={() => handleVoiceDate("useBy")} className={`rounded px-3 py-2 text-sm font-semibold ${voiceListening === "useBy" ? "bg-red-500 text-white animate-pulse" : "bg-gray-100 text-gray-800"}`}>{voiceListening === "useBy" ? "🎤 Listening..." : "🎤"}</button>
                        </div>
                        {voiceListening === "useBy" && <p className="text-xs text-green-700 mt-1">Say the date e.g. February 20 2026</p>}
                      </div>
                      {barcodeLocation === "Fridge" && barcodeItem.category === "Meat" && (
                        <div>
                          <label className="mb-1 block text-sm font-medium text-gray-700">Freeze By Date <span className="text-xs text-gray-400">(optional — we will remind you)</span></label>
                          <div className="flex gap-2">
                            <input type="date" value={barcodeFreezeBy} onChange={(e) => setBarcodeFreezeBy(e.target.value)} className="flex-1 rounded border px-3 py-2 text-sm text-gray-900" />
                            <button onClick={() => handleVoiceDate("freezeBy")} className={`rounded px-3 py-2 text-sm font-semibold ${voiceListening === "freezeBy" ? "bg-red-500 text-white animate-pulse" : "bg-gray-100 text-gray-800"}`}>{voiceListening === "freezeBy" ? "🎤 Listening..." : "🎤"}</button>
                          </div>
                          {voiceListening === "freezeBy" && <p className="text-xs text-green-700 mt-1">Say the date e.g. February 25 2026</p>}
                        </div>
                      )}
                      {voiceError && <p className="text-xs text-red-500">{voiceError}</p>}
                    </div>
                  )}
                  <button onClick={handleAddBarcodeItem} disabled={!barcodeLocation} className={`w-full rounded-xl py-2.5 text-sm font-bold ${!barcodeLocation ? "bg-gray-300 text-white" : "btn-green-3d"}`}>Add to Tracker</button>
                  <button onClick={() => { setBarcodeItem(null); setBarcodeDetected(""); setBarcodeLocation(""); setBarcodeUseBy(""); setBarcodeFreezeBy(""); setVoiceError(""); }} className="w-full rounded-xl border bg-gradient-to-b from-white to-gray-50 py-2 text-sm font-bold text-gray-600 pill-3d">Scan Another</button>
                </div>
              )}
              <button onClick={() => { setShowBarcodeScanner(false); setBarcodeItem(null); setBarcodeError(""); setBarcodeDetected(""); }} className="mt-3 w-full rounded-xl border bg-gradient-to-b from-white to-gray-50 py-2 text-sm font-bold text-gray-600 pill-3d">Cancel</button>
            </div>
          </div>
        )}

        {showQuickAdd && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-lg">
              <h2 className="mb-2 text-lg font-bold">✏️ Quick Add</h2>
              <p className="mb-4 text-sm text-gray-600">Select a food from the list or type your own.</p>
              <div className="space-y-3">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Food Item</label>
                  <FoodAutocomplete
                    value={quickAddName}
                    onChange={setQuickAddName}
                    onSelect={(f) => { setQuickAddName(f.name); setQuickAddCategory(f.category); setQuickAddLocation(f.location); }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Category</label>
                    <select value={quickAddCategory} onChange={(e) => setQuickAddCategory(e.target.value)} className="w-full rounded border px-3 py-2 text-sm text-gray-900">
                      {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Location</label>
                    <select value={quickAddLocation} onChange={(e) => setQuickAddLocation(e.target.value)} className="w-full rounded border px-3 py-2 text-sm text-gray-900">
                      {LOCATIONS.map((l) => <option key={l} value={l}>{LOCATION_ICONS[l]} {l}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Quantity</label>
                  <div className="flex gap-2">
                    <input value={quickAddQty} onChange={(e) => setQuickAddQty(e.target.value)} placeholder="e.g. 2 lbs" className="flex-1 rounded border px-3 py-2 text-sm text-gray-900" />
                    <button onClick={() => handleQuickVoice("qty")} className={`rounded px-3 py-2 text-sm font-semibold ${quickVoiceListening === "qty" ? "bg-red-500 text-white animate-pulse" : "bg-gray-100 text-gray-800"}`}>{quickVoiceListening === "qty" ? "🎤 Listening..." : "🎤"}</button>
                  </div>
                  {quickVoiceListening === "qty" && <p className="text-xs text-green-700 mt-1">Say quantity e.g. two pounds</p>}
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Use By Date</label>
                  <div className="flex gap-2">
                    <input type="date" value={quickAddDate} onChange={(e) => setQuickAddDate(e.target.value)} className="flex-1 rounded border px-3 py-2 text-sm text-gray-900" />
                    <button onClick={() => handleQuickVoice("date")} className={`rounded px-3 py-2 text-sm font-semibold ${quickVoiceListening === "date" ? "bg-red-500 text-white animate-pulse" : "bg-gray-100 text-gray-800"}`}>{quickVoiceListening === "date" ? "🎤 Listening..." : "🎤"}</button>
                  </div>
                  {quickVoiceListening === "date" && <p className="text-xs text-green-700 mt-1">Say date e.g. February 20 2026</p>}
                  {quickVoiceError && <p className="text-xs text-red-500 mt-1">{quickVoiceError}</p>}
                </div>
                <button onClick={handleQuickAdd} className="w-full rounded-xl py-2.5 text-sm btn-green-3d">Add to Tracker</button>
                <button onClick={() => { setShowQuickAdd(false); setQuickAddName(""); setQuickAddDate(""); setQuickAddQty(""); setQuickAddCategory("Other"); setQuickAddLocation("Fridge"); }} className="w-full rounded border py-2 text-sm font-semibold text-gray-600">Cancel</button>
              </div>
            </div>
          </div>
        )}

        {showLabelScanner && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-lg">
              <h2 className="mb-2 text-lg font-bold">🏷️ Scan Package Label</h2>
              <p className="mb-4 text-sm text-gray-600">Take a photo of the package label and Claude will read the item name and date automatically.</p>
              {!labelScanning && !labelItem && (
                <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-green-300 bg-green-50 p-8 hover:bg-green-100">
                  <span className="text-3xl mb-2">🏷️</span>
                  <span className="text-sm font-semibold text-green-600">Tap to upload package photo</span>
                  <span className="text-xs text-gray-500 mt-1">JPG, PNG supported</span>
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files[0] && handleScanLabel(e.target.files[0])} />
                </label>
              )}
              {labelScanning && (
                <div className="flex flex-col items-center py-8">
                  <div className="mb-3 text-3xl animate-spin">⏳</div>
                  <p className="text-sm text-gray-600">Claude is reading the label...</p>
                </div>
              )}
              {labelError && <p className="mt-2 text-sm text-red-600">Error: {labelError}</p>}
              {labelItem && (
                <div className="space-y-3">
                  <div className="rounded-lg border p-3 bg-gray-50">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div><span className="font-semibold text-gray-600">Item:</span><p className="font-bold">{labelItem.name}</p></div>
                      <div><span className="font-semibold text-gray-600">Date:</span><p className="font-bold">{labelItem.dateType}: {labelItem.date || "Not found"}</p></div>
                      <div><span className="font-semibold text-gray-600">Category:</span><p>{labelItem.category}</p></div>
                      <div><span className="font-semibold text-gray-600">Location:</span><p>{labelItem.location}</p></div>
                    </div>
                  </div>
                  <button onClick={handleAddLabelItem} className="w-full rounded-xl py-2.5 text-sm btn-green-3d">Add to Tracker</button>
                  <button onClick={() => setLabelItem(null)} className="w-full rounded-xl border bg-gradient-to-b from-white to-gray-50 py-2 text-sm font-bold text-gray-600 pill-3d">Scan Another</button>
                </div>
              )}
              <button onClick={() => { setShowLabelScanner(false); setLabelItem(null); setLabelError(""); }} className="mt-3 w-full rounded-xl border bg-gradient-to-b from-white to-gray-50 py-2 text-sm font-bold text-gray-600 pill-3d">Cancel</button>
            </div>
          </div>
        )}

        {activeTab === "tracker" && (
          <>
            <div className="grid grid-cols-2 gap-2">
            <button onClick={() => setActiveTab("home")} className="flex items-center gap-1 text-sm font-semibold text-green-700 mb-3"><span>←</span> Home</button>
              <button onClick={() => setShowReceiptScanner(true)} className="rounded-xl bg-gradient-to-b from-green-100 to-green-200 py-3 text-xs font-bold text-green-800 btn-3d border border-green-300">📷 Receipt</button>
              <button onClick={() => setShowLabelScanner(true)} className="rounded-xl bg-gradient-to-b from-orange-100 to-orange-200 py-3 text-xs font-bold text-orange-800 btn-3d border border-orange-300">🏷️ Label</button>
              <button onClick={() => setShowBarcodeScanner(true)} className="rounded-xl bg-gradient-to-b from-purple-100 to-purple-200 py-3 text-xs font-bold text-purple-800 btn-3d border border-purple-300">📦 Barcode</button>
              <button onClick={() => setShowQuickAdd(true)} className="rounded-xl bg-gradient-to-b from-amber-100 to-amber-200 py-3 text-xs font-bold text-amber-800 btn-3d border border-amber-300">✏️ Quick Add</button>
            </div>
          <>
            <Card>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Item</label>
                  <FoodAutocomplete
                    value={itemName}
                    onChange={setItemName}
                    onSelect={(f) => { setItemName(f.name); setCategory(f.category); setLocation(f.location); }}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Quantity</label>
                  <input value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="e.g. 2 lbs, 1 carton" className="w-full rounded border px-3 py-2 text-sm text-gray-900" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Category</label>
                  <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full rounded border px-3 py-2 text-sm text-gray-900">
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Location</label>
                  <select value={location} onChange={(e) => setLocation(e.target.value)} className="w-full rounded border px-3 py-2 text-sm text-gray-900">
                    {LOCATIONS.map((l) => <option key={l} value={l}>{LOCATION_ICONS[l]} {l}</option>)}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Use By</label>
                  <input type="date" value={useByDate} onChange={(e) => setUseByDate(e.target.value)} className="w-full rounded border px-3 py-2 text-sm text-gray-900" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Opened (optional)</label>
                  <input type="date" value={openDate} onChange={(e) => setOpenDate(e.target.value)} className="w-full rounded border px-3 py-2 text-sm text-gray-900" />
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button onClick={handleAddItem} className="inline-flex items-center gap-1 rounded-xl px-3 py-2 text-sm btn-green-3d"><PlusCircle className="h-4 w-4" /> Add</button>
              </div>
            </Card>
            <Card>
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-800">Tracked Items</h2>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">{filteredItems.length} item{filteredItems.length === 1 ? "" : "s"}</span>
                  {trackedItems.length > 0 && <button onClick={() => { if (window.confirm("Clear all tracked items and start fresh?")) { setTrackedItems([]); } }} className="rounded bg-red-100 px-2 py-1 text-xs font-semibold text-red-600">Clear All</button>}
                </div>
              </div>
              <div className="mb-2 flex flex-wrap gap-1">
                {["All", ...LOCATIONS].map((l) => (
                  <button key={l} onClick={() => setFilterLocation(l)} className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${filterLocation === l ? "bg-green-700 text-white" : "bg-white text-gray-600 hover:bg-green-50 border border-gray-200 pill-3d"}`}>
                    {l !== "All" ? LOCATION_ICONS[l] + " " : ""}{l}
                  </button>
                ))}
              </div>
              <div className="mb-3 flex flex-wrap gap-1">
                {["All", ...CATEGORIES].map((c) => (
                  <button key={c} onClick={() => setFilterCategory(c)} className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${filterCategory === c ? "bg-green-700 text-white" : "bg-white text-gray-600 hover:bg-green-50 border border-gray-200 pill-3d"}`}>{c}</button>
                ))}
              </div>
              {filteredItems.length === 0 ? (
                <p className="text-sm text-gray-600">No items match this filter.</p>
              ) : (
                <div className="space-y-2">
                  {filteredItems.map((it) => {
                    const urgent = it.daysLeft !== null && it.daysLeft <= 3;
                    const soon = it.daysLeft !== null && it.daysLeft <= 7 && it.daysLeft > 3;
                    return (
                      <div key={it.id} className={`rounded-lg border px-3 py-2 ${urgent ? "border-red-300 bg-gradient-to-r from-red-50 to-red-100/50 shadow-sm" : soon ? "border-yellow-300 bg-gradient-to-r from-yellow-50 to-amber-50/50 shadow-sm" : "bg-white shadow-sm hover:shadow-md transition-shadow"}`}>
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-semibold">{it.name}</span>
                              {it.quantity && <span className="text-xs text-gray-500">{it.quantity}</span>}
                              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${LOCATION_COLORS[it.location ?? "Fridge"]}`}>{LOCATION_ICONS[it.location ?? "Fridge"]} {it.location ?? "Fridge"}</span>
                              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${CATEGORY_COLORS[it.category ?? "Other"]}`}>{it.category ?? "Other"}</span>
                            </div>
                            <div className="text-xs text-gray-600 mt-0.5">Use by: {it.useByDate}{it.openDate ? " • Opened: " + it.openDate : ""}</div>
                            {it.daysAfterOpening && <div className="text-xs text-orange-600 mt-0.5">📂 After opening: use within {it.daysAfterOpening} days</div>}
                            {it.storageTip && <div className="text-xs text-green-700 mt-0.5">💡 {it.storageTip}</div>}
                            {it.openedTip && <div className="text-xs text-orange-500 mt-0.5">⚠️ {it.openedTip}</div>}
                          </div>
                          <div className="flex items-center gap-2 ml-2">
                            <div className="text-right">
                              <div className={`text-sm font-bold ${urgent ? "text-red-600" : soon ? "text-yellow-600" : "text-gray-800"}`}>{it.daysLeft === null ? "—" : it.daysLeft}</div>
                              <div className="text-xs text-gray-500">days</div>
                            </div>
                            <div className="flex flex-col gap-1">
                              <button onClick={() => handleUseTodayItem(it.id)} className="rounded-lg bg-gradient-to-r from-green-600 to-emerald-800 px-3 py-1 text-xs font-bold text-white shadow-md" style={{textShadow:"0 1px 2px rgba(0,0,0,0.4)"}}>Used</button>
                              {it.category === "Meat" && it.location === "Fridge" && (() => { const fd = it.freezeBy ? daysUntil(it.freezeBy) : null; const ud = it.daysLeft; return (fd !== null && fd <= 2) || (ud !== null && ud <= 3); })() && (
                                <button onClick={() => handleFreezeItem(it.id)} className="rounded-lg bg-gradient-to-r from-cyan-600 to-blue-800 px-3 py-1 text-xs font-bold text-white shadow-md animate-pulse" style={{textShadow:"0 1px 2px rgba(0,0,0,0.4)"}}>❄️ Freeze!</button>
                              )}
                              <button onClick={() => handleEditItem(it.id)} className="rounded-lg bg-emerald-700 px-3 py-1 text-xs font-bold text-white btn-3d">Edit</button>
                              <button onClick={() => handleRemoveItem(it.id)} className="rounded-lg border border-gray-200 bg-white px-3 py-1 text-xs font-semibold text-gray-700 hover:border-red-300 hover:text-red-600 pill-3d">Remove</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </Card>
          </>
          </>
        )}
        {activeTab === "recipes" && (
          <Card>
            <div className="mb-3 flex items-center gap-2">
            <button onClick={() => setActiveTab("home")} className="flex items-center gap-1 text-sm font-semibold text-green-700 mb-3"><span>←</span> Home</button><ChefHat className="h-5 w-5 text-orange-500" /><h2 className="text-lg font-bold">Recipe Suggestions</h2></div>
            <p className="mb-4 text-sm text-gray-600">Recipes matched to your ingredients, prioritizing what expires soonest. Tap a recipe to see full instructions.</p>
            <button onClick={handleSuggestRecipes} disabled={recipesLoading} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-600 to-orange-700 px-5 py-2.5 text-sm font-bold text-white shadow-lg disabled:opacity-50" style={{textShadow:"0 1px 2px rgba(0,0,0,0.4)"}}>{recipesLoading ? <><span className="animate-spin">🤖</span> AI is cooking...</> : <><ChefHat className="h-4 w-4" /> Get AI Recipe Ideas</>}</button>
            {recipesGenerated && recipeSuggestions.length === 0 && <p className="mt-4 text-sm text-gray-500">No matches found. Try adding more items like eggs, carrots, or onions.</p>}
            {recipeSuggestions.length > 0 && (
              <div className="mt-4 space-y-3">
                {recipeSuggestions.map((r, i) => (
                  <div key={i} className="rounded-lg border border-orange-100 bg-orange-50 overflow-hidden">
                    <button onClick={() => setExpandedRecipe(expandedRecipe === i ? null : i)} className="w-full p-4 text-left">
                      <div className="flex items-start justify-between">
                        <h3 className="font-bold text-gray-800">{r.name}</h3>
                        <div className="flex items-center gap-2 ml-2 shrink-0">
                          <span className="rounded bg-orange-200 px-2 py-0.5 text-xs font-semibold text-orange-800">⏱ {r.time}</span>
                          <span className="text-gray-400 text-sm">{expandedRecipe === i ? "▲" : "▼"}</span>
                        </div>
                      </div>
                      <p className="mt-1 text-sm text-gray-600">{r.description}</p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {r.difficulty && <span className="rounded-full bg-purple-100 px-2 py-0.5 text-xs font-bold text-purple-700">{r.difficulty}</span>}
                        {(r.usesExpiring || []).map((name, j) => (
                          <span key={j} className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">⚡ {name}</span>
                        ))}
                      </div>
                    </button>
                    {expandedRecipe === i && (
                      <div className="border-t border-orange-200 bg-white px-4 py-3">
                        {r.ingredients && r.ingredients.length > 0 && (<><h4 className="mb-2 text-sm font-bold text-gray-700">Ingredients</h4><ul className="mb-3 space-y-1">{r.ingredients.map((ing, j) => <li key={j} className="text-sm text-gray-600 flex items-center gap-1"><span className="text-green-500">•</span> {ing}</li>)}</ul></>)}
                        <h4 className="mb-2 text-sm font-bold text-gray-700">Instructions</h4>
                        <p className="whitespace-pre-line text-sm text-gray-700 leading-relaxed">{r.instructions}</p>
                        <div className="mt-3 flex justify-end">
                          <button onClick={() => handleSaveRecipeToCommunity(r)} disabled={savedRecipes.includes(r.name)} className={`rounded px-3 py-1.5 text-xs font-semibold ${savedRecipes.includes(r.name) ? "bg-gray-100 text-gray-400" : "bg-green-700 text-white hover:bg-blue-700"}`}>
                            {savedRecipes.includes(r.name) ? "Saved to Community" : "Save to Community"}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            {!recipesGenerated && <div className="mt-4 rounded-lg bg-gray-50 p-4 text-sm text-gray-500">You have {trackedItems.length} tracked item{trackedItems.length === 1 ? "" : "s"}. Click the button to see recipe matches.{trackedItems.length === 0 && " Add items in the Tracker tab first."}</div>}
          </Card>
        )}

        {activeTab === "shopping" && (
          <>
            <Card>
              <div className="mb-3 flex items-center gap-2">
            <button onClick={() => setActiveTab("home")} className="flex items-center gap-1 text-sm font-semibold text-green-700 mb-3"><span>←</span> Home</button>
                <ShoppingCart className="h-5 w-5 text-green-600" />
                <h2 className="text-lg font-bold">Shopping List</h2>
                {shoppingItems.some((it) => it.checked) && (
                  <button onClick={handleClearChecked} className="ml-auto rounded bg-red-100 px-3 py-1 text-xs font-semibold text-red-600">Clear Checked</button>
                )}
              </div>
              <div className="flex gap-2 mb-2">
                <input value={newShoppingItem} onChange={(e) => setNewShoppingItem(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleAddShoppingItem()} placeholder="Add item…" className="rounded-xl px-3 py-2 text-sm btn-green-3d" />
                <input value={newShoppingQty} onChange={(e) => setNewShoppingQty(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleAddShoppingItem()} placeholder="Qty" className="rounded-xl px-3 py-2 text-sm btn-green-3d" />
                <button onClick={handleAddShoppingItem} className="rounded-xl px-3 py-2 text-sm btn-green-3d">Add</button>
              </div>
              {shoppingItems.length === 0 ? (
                <p className="text-sm text-gray-500 mt-3">Your shopping list is empty.</p>
              ) : (
                <div className="mt-3 space-y-2">
                  {shoppingItems.map((it) => (
                    <div key={it.id} className={`flex items-center gap-3 rounded-lg border px-3 py-2 ${it.checked ? "bg-gray-50 opacity-60" : "bg-white"}`}>
                      <input type="checkbox" checked={it.checked} onChange={() => handleToggleShoppingItem(it.id)} className="h-4 w-4 rounded accent-green-600" />
                      <div className="flex-1">
                        <span className={`text-sm ${it.checked ? "line-through text-gray-400" : "text-gray-800"}`}>{it.name}{it.qty ? " — " + it.qty : ""}</span>
                        {it.forMeal && <div className="mt-0.5"><span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700">📅 {it.forMeal}</span></div>}
                      </div>
                      <button onClick={() => handleRemoveShoppingItem(it.id)} className="text-xs text-gray-400 hover:text-red-500">✕</button>
                    </div>
                  ))}
                </div>
              )}
            </Card>
            {expiringSoon.length > 0 && (
              <Card>
                <h3 className="mb-2 font-bold text-gray-700">🔔 Expiring Soon — Add to List?</h3>
                <p className="mb-3 text-xs text-gray-500">These items expire within 7 days. Tap to add a replacement to your shopping list.</p>
                <div className="space-y-2">
                  {expiringSoon.map((it) => {
                    const alreadyAdded = shoppingItems.some((s) => s.name.toLowerCase() === it.name.toLowerCase());
                    const urgent = it.daysLeft !== null && it.daysLeft <= 3;
                    return (
                      <div key={it.id} className={`flex items-center justify-between rounded-lg border px-3 py-2 ${urgent ? "border-red-200 bg-red-50" : "border-yellow-200 bg-yellow-50"}`}>
                        <div>
                          <span className="text-sm font-semibold">{it.name}</span>
                          <span className={`ml-2 text-xs font-bold ${urgent ? "text-red-600" : "text-yellow-600"}`}>{it.daysLeft}d left</span>
                        </div>
                        <button onClick={() => handleAddToShoppingFromTracker(it)} disabled={alreadyAdded} className={`rounded-xl px-3 py-1.5 text-xs font-bold ${alreadyAdded ? "bg-gray-200 text-gray-400" : "btn-green-3d"}`}>
                          {alreadyAdded ? "Added" : "+ Add"}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </Card>
            )}
          </>
        )}
        {showMealPicker && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-lg">
              <h2 className="mb-1 text-lg font-bold">Pick a Meal</h2>
              <p className="mb-3 text-xs text-gray-500">{mealPickerDay} — {mealPickerSlot}</p>
              <div className="flex gap-2 mb-3">
                <MealSearchInput value={mealPickerSearch} onChange={(e) => setMealPickerSearch(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && mealPickerSearch.trim()) handleSetMeal(mealPickerDay, mealPickerSlot, mealPickerSearch.trim()); }} />
                {mealPickerSearch.trim() && <button onClick={() => handleSetMeal(mealPickerDay, mealPickerSlot, mealPickerSearch.trim())} className="rounded-xl px-3 py-2 text-sm btn-green-3d">Add</button>}
              </div>
              <div className="max-h-64 overflow-y-auto space-y-2">
                {mealPickerSearch && !RECIPE_DB.find((r) => r.name.toLowerCase() === mealPickerSearch.toLowerCase()) && (
                  <button onClick={() => handleSetMeal(mealPickerDay, mealPickerSlot, mealPickerSearch)} className="w-full rounded-xl py-2 text-sm btn-green-3d">+ Add "{mealPickerSearch}" as custom meal</button>
                )}
                {RECIPE_DB.filter((r) => r.name.toLowerCase().includes(mealPickerSearch.toLowerCase())).map((r) => {
                  const usesExpiring = r.ingredients.some((ing) => itemsWithCountdown.some((it) => it.daysLeft !== null && it.daysLeft <= 7 && (it.name.toLowerCase().includes(ing) || ing.includes(it.name.toLowerCase()))));
                  return (
                    <button key={r.name} onClick={() => handleSetMeal(mealPickerDay, mealPickerSlot, r.name)} className="w-full rounded-lg border px-3 py-2 text-left text-sm hover:bg-orange-50">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{r.name}</span>
                        <div className="flex items-center gap-1">
                          {usesExpiring && <span className="text-xs text-orange-500">⚡ uses expiring</span>}
                          <span className="text-xs text-gray-400">⏱ {r.time}</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
              <button onClick={() => { setShowMealPicker(false); setMealPickerSearch(""); }} className="mt-3 w-full rounded-xl border bg-gradient-to-b from-white to-gray-50 py-2 text-sm font-bold text-gray-600 pill-3d">Cancel</button>
            </div>
          </div>
        )}

        {activeTab === "meals" && (
          <>
            <Card>
              <div className="mb-3 flex items-center justify-between">
            <button onClick={() => setActiveTab("home")} className="flex items-center gap-1 text-sm font-semibold text-green-700 mb-3"><span>←</span> Home</button>
                <div className="flex items-center gap-2">
                  <span className="text-xl">📅</span>
                  <h2 className="text-lg font-bold">Meal Planner</h2>
                </div>
                <button onClick={handleAiPlanWeek} disabled={aiPlanLoading} className={`rounded-xl px-4 py-2 text-xs font-bold text-white shadow-lg ${aiPlanLoading ? "bg-gray-400" : "bg-gradient-to-r from-purple-700 to-indigo-800"}`} style={{textShadow:"0 1px 2px rgba(0,0,0,0.4)"}}>
                  {aiPlanLoading ? <><span className="animate-spin inline-block">🤖</span> AI is planning...</> : "✨ AI Plan My Week"}
                </button>
              </div>
              <p className="text-xs text-gray-500 mb-4">Tap any slot to add a meal. ⚡ means it uses ingredients expiring soon.</p>
              <div className="space-y-4">
                {DAYS.map((day) => (
                  <div key={day} className="rounded-lg border overflow-hidden">
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-3 py-2 font-bold text-sm text-green-800">{day}</div>
                    <div className="divide-y">
                      {MEAL_SLOTS.map((slot) => {
                        const meal = meals[`${day}-${slot}`];
                        const usesExpiring = meal && itemsWithCountdown.some((it) => it.daysLeft !== null && it.daysLeft <= 7 && meal.toLowerCase().includes(it.name.toLowerCase().split(" ")[0]));
                        return (
                          <div key={slot} className="flex items-center gap-2 px-3 py-2">
                            <span className="w-16 text-xs font-medium text-gray-500">{slot}</span>
                            {meal ? (
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-1">
                                    {usesExpiring && <span className="text-orange-400">⚡</span>}
                                    <span className="text-sm font-medium">{meal}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <button onClick={() => handleAddMealIngredientsToShopping(meal)} className="rounded-lg bg-gradient-to-b from-green-100 to-green-200 px-2 py-1 text-xs font-bold text-green-700 pill-3d">+ List</button>
                                    <button onClick={() => { setMealPickerDay(day); setMealPickerSlot(slot); setShowMealPicker(true); }} className="rounded-lg bg-gradient-to-b from-gray-100 to-gray-200 px-2 py-1 text-xs font-semibold text-gray-500 pill-3d">Change</button>
                                    <button onClick={() => handleClearMeal(day, slot)} className="text-xs text-gray-400 hover:text-red-500">✕</button>
                                  </div>
                                </div>

                              </div>
                            ) : (
                              <button onClick={() => { setMealPickerDay(day); setMealPickerSlot(slot); setShowMealPicker(true); }} className="flex-1 rounded-lg py-2 text-xs font-semibold btn-green-3d">+ Add meal</button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </>
        )}

        {activeTab === "community" && (
          <>
            <button onClick={() => setActiveTab("home")} className="flex items-center gap-1 text-sm font-semibold text-green-700 mb-3"><span>←</span> Home</button>
            <div className="stew-scene mb-4" style={{position: "relative", height: "220px", width: "100%", overflow: "hidden"}}>
              <div style={{position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: 160, height: 90, background: "linear-gradient(to bottom, #6b7280, #4b5563)", borderRadius: "0 0 40% 40%", borderTop: "8px solid #374151", zIndex: 10}}></div>
              <div style={{position: "absolute", bottom: 82, left: "50%", transform: "translateX(-50%)", width: 180, height: 16, background: "linear-gradient(to bottom, #9ca3af, #6b7280)", borderRadius: 8, zIndex: 11}}></div>
              <div style={{position: "absolute", bottom: 8, left: "50%", transform: "translateX(-50%)", width: 148, height: 50, background: "linear-gradient(to bottom, #ea580c, #c2410c)", borderRadius: "0 0 38% 38%", zIndex: 11}}></div>
              <div style={{position: "absolute", bottom: 55, left: "calc(50% - 95px)", width: 20, height: 30, border: "4px solid #374151", borderRight: "none", borderRadius: "10px 0 0 10px", zIndex: 9}}></div>
              <div style={{position: "absolute", bottom: 55, left: "calc(50% + 75px)", width: 20, height: 30, border: "4px solid #374151", borderLeft: "none", borderRadius: "0 10px 10px 0", zIndex: 9}}></div>
              <div className="steam" style={{left: "calc(50% - 20px)", bottom: 100, animationDelay: "0s"}}>☁️</div>
              <div className="steam" style={{left: "calc(50% + 10px)", bottom: 105, animationDelay: "0.5s"}}>☁️</div>
              <div className="steam" style={{left: "calc(50% - 5px)", bottom: 95, animationDelay: "1s"}}>☁️</div>
              <div className="bubble-pot" style={{left: "calc(50% - 15px)", bottom: 30, animationDelay: "0s"}}></div>
              <div className="bubble-pot" style={{left: "calc(50% + 10px)", bottom: 25, animationDelay: "0.3s"}}></div>
              <div className="bubble-pot" style={{left: "calc(50% - 5px)", bottom: 35, animationDelay: "0.7s"}}></div>
              <CommunityStewAnim />
            </div>
            {!username ? (
              <Card>
                <div className="mb-2 flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-500" /><h2 className="text-lg font-bold">Join the Community</h2></div>
                <p className="mb-3 text-sm text-gray-600">Choose a display name to get started.</p>
                <div className="flex gap-2">
                  <input value={usernameInput} onChange={(e) => setUsernameInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSetUsername()} placeholder="Your display name" className="flex-1 rounded border px-3 py-2 text-sm text-gray-900" />
                  <button onClick={handleSetUsername} className="rounded-xl px-4 py-2 text-sm btn-green-3d">Join</button>
                </div>
              </Card>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">Signed in as <span className="font-semibold text-green-700">{username}</span></p>
                  <button onClick={() => { setUsername(""); localStorage.removeItem(USERNAME_KEY); }} className="text-xs text-gray-400 underline">Change name</button>
                </div>
                <div className="flex gap-1 rounded-xl bg-gray-100 p-1">
                  {[["chat","💬 Chat"],["recipes","📖 Recipes"],["tips","💡 Tips"]].map(([id, label]) => (
                    <button key={id} onClick={() => setCommunityTab(id)} className={`flex-1 rounded-lg py-2 text-sm font-semibold transition-colors ${communityTab === id ? "bg-white shadow text-green-700" : "text-gray-500"}`}>{label}</button>
                  ))}
                </div>
                {communityTab === "chat" && (
                  <Card>
                    <h3 className="mb-3 font-bold">Community Chat</h3>
                    <div className="mb-3 max-h-64 space-y-2 overflow-y-auto">
                      {community.chat.length === 0 ? <p className="text-sm text-gray-500">No messages yet — say hello!</p> : community.chat.map((msg) => (
                        <div key={msg.id} className="rounded-lg bg-gray-50 px-3 py-2">
                          <div className="flex items-center justify-between"><span className="text-xs font-semibold text-green-700">{msg.author}</span><span className="text-xs text-gray-400">{msg.time}</span></div>
                          <p className="text-sm text-gray-800">{msg.text}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input value={newChat} onChange={(e) => setNewChat(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handlePostChat()} placeholder="Type a message…" className="flex-1 rounded border px-3 py-2 text-sm text-gray-900" />
                      <button onClick={handlePostChat} className="rounded-xl bg-gradient-to-b from-green-600 to-green-700 px-4 py-2 text-sm font-bold text-white btn-3d">Send</button>
                    </div>
                  </Card>
                )}
                {communityTab === "recipes" && (
                  <Card>
                    <h3 className="mb-3 font-bold">Recipe Exchange</h3>
                    <div className="mb-4 space-y-2">
                      <input value={newRecipeTitle} onChange={(e) => setNewRecipeTitle(e.target.value)} placeholder="Recipe title" className="w-full rounded border px-3 py-2 text-sm text-gray-900" />
                      <textarea value={newRecipeBody} onChange={(e) => setNewRecipeBody(e.target.value)} placeholder="Ingredients and instructions…" rows={3} className="w-full rounded border px-3 py-2 text-sm text-gray-900" />
                      <button onClick={handlePostRecipe} className="rounded-xl bg-gradient-to-b from-green-600 to-green-700 px-4 py-2 text-sm font-bold text-white btn-3d">Share Recipe</button>
                    </div>
                    <div className="space-y-3">
                      {community.recipes.length === 0 ? <p className="text-sm text-gray-500">No recipes shared yet — be the first!</p> : community.recipes.map((r) => (
                        <div key={r.id} className="rounded-lg border p-3">
                          <div className="flex items-center justify-between"><span className="font-semibold">{r.title}</span><span className="text-xs text-gray-400">{r.date}</span></div>
                          <p className="mt-1 text-xs text-green-700">{r.author}</p>
                          <p className="mt-1 whitespace-pre-wrap text-sm text-gray-700">{r.body}</p>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}
                {communityTab === "tips" && (
                  <Card>
                    <h3 className="mb-3 font-bold">Tips & Ideas</h3>
                    <div className="mb-4 flex gap-2">
                      <input value={newTip} onChange={(e) => setNewTip(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handlePostTip()} placeholder="Share a food storage tip…" className="flex-1 rounded border px-3 py-2 text-sm text-gray-900" />
                      <button onClick={handlePostTip} className="rounded-xl bg-gradient-to-b from-green-600 to-green-700 px-4 py-2 text-sm font-bold text-white btn-3d">Post</button>
                    </div>
                    <div className="space-y-2">
                      {community.tips.length === 0 ? <p className="text-sm text-gray-500">No tips yet — share one!</p> : community.tips.map((tip) => (
                        <div key={tip.id} className="rounded-lg bg-yellow-50 border border-yellow-200 px-3 py-2">
                          <div className="flex items-center justify-between"><span className="text-xs font-semibold text-green-700">{tip.author}</span><span className="text-xs text-gray-400">{tip.date}</span></div>
                          <p className="text-sm text-gray-800">{tip.text}</p>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}
              </>
            )}
          </>
        )}

        {activeTab === "stores" && (
          <div className="space-y-4">
            <button onClick={() => setActiveTab("home")} className="flex items-center gap-1 text-sm font-semibold text-green-700 mb-3"><span>←</span> Home</button>
            <div className="rounded-2xl bg-white p-5 card-3d">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">🏪</span>
                <h2 className="text-lg font-bold">Shop Online</h2>
              </div>
              <p className="text-sm text-gray-500 mb-4">Tap any store to shop for groceries online.</p>
              <div className="grid grid-cols-2 gap-3">

                <a href="https://www.amazon.com/alm/storefront?almBrandId=QW1hem9uIEZyZXNo" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 rounded-xl border-2 border-gray-100 bg-gradient-to-b from-white to-gray-50 p-4 shadow-sm hover:shadow-md hover:border-green-200 transition-all">
                  <span className="text-3xl">🛒</span>
                  <span className="text-sm font-bold text-gray-800">Amazon Fresh</span>
                  <span className="text-xs text-green-600 font-semibold">Shop Now →</span>
                </a>

                <a href="https://www.kroger.com" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 rounded-xl border-2 border-gray-100 bg-gradient-to-b from-white to-gray-50 p-4 shadow-sm hover:shadow-md hover:border-green-200 transition-all">
                  <span className="text-3xl">🏬</span>
                  <span className="text-sm font-bold text-gray-800">Kroger</span>
                  <span className="text-xs text-green-600 font-semibold">Shop Now →</span>
                </a>

                <a href="https://www.walmart.com/cp/food/976759" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 rounded-xl border-2 border-gray-100 bg-gradient-to-b from-white to-gray-50 p-4 shadow-sm hover:shadow-md hover:border-green-200 transition-all">
                  <span className="text-3xl">🔵</span>
                  <span className="text-sm font-bold text-gray-800">Walmart</span>
                  <span className="text-xs text-green-600 font-semibold">Shop Now →</span>
                </a>

                <a href="https://www.wholefoodsmarket.com" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 rounded-xl border-2 border-gray-100 bg-gradient-to-b from-white to-gray-50 p-4 shadow-sm hover:shadow-md hover:border-green-200 transition-all">
                  <span className="text-3xl">🥬</span>
                  <span className="text-sm font-bold text-gray-800">Whole Foods</span>
                  <span className="text-xs text-green-600 font-semibold">Shop Now →</span>
                </a>

                <a href="https://www.target.com/c/grocery/-/N-5xt1a" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 rounded-xl border-2 border-gray-100 bg-gradient-to-b from-white to-gray-50 p-4 shadow-sm hover:shadow-md hover:border-green-200 transition-all">
                  <span className="text-3xl">🎯</span>
                  <span className="text-sm font-bold text-gray-800">Target</span>
                  <span className="text-xs text-green-600 font-semibold">Shop Now →</span>
                </a>

                <a href="https://www.costco.com/grocery-household.html" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 rounded-xl border-2 border-gray-100 bg-gradient-to-b from-white to-gray-50 p-4 shadow-sm hover:shadow-md hover:border-green-200 transition-all">
                  <span className="text-3xl">📦</span>
                  <span className="text-sm font-bold text-gray-800">Costco</span>
                  <span className="text-xs text-green-600 font-semibold">Shop Now →</span>
                </a>

                <a href="https://www.traderjoes.com" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 rounded-xl border-2 border-gray-100 bg-gradient-to-b from-white to-gray-50 p-4 shadow-sm hover:shadow-md hover:border-green-200 transition-all">
                  <span className="text-3xl">🌺</span>
                  <span className="text-sm font-bold text-gray-800">Trader Joe&apos;s</span>
                  <span className="text-xs text-green-600 font-semibold">Shop Now →</span>
                </a>

                <a href="https://www.instacart.com" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 rounded-xl border-2 border-gray-100 bg-gradient-to-b from-white to-gray-50 p-4 shadow-sm hover:shadow-md hover:border-green-200 transition-all">
                  <span className="text-3xl">🥕</span>
                  <span className="text-sm font-bold text-gray-800">Instacart</span>
                  <span className="text-xs text-green-600 font-semibold">Shop Now →</span>
                </a>

                <a href="https://www.freshdirect.com" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 rounded-xl border-2 border-gray-100 bg-gradient-to-b from-white to-gray-50 p-4 shadow-sm hover:shadow-md hover:border-green-200 transition-all">
                  <span className="text-3xl">🍎</span>
                  <span className="text-sm font-bold text-gray-800">FreshDirect</span>
                  <span className="text-xs text-green-600 font-semibold">Shop Now →</span>
                </a>

                <a href="https://www.mortonwilliams.com" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 rounded-xl border-2 border-gray-100 bg-gradient-to-b from-white to-gray-50 p-4 shadow-sm hover:shadow-md hover:border-green-200 transition-all">
                  <span className="text-3xl">🏙️</span>
                  <span className="text-sm font-bold text-gray-800">Morton Williams</span>
                  <span className="text-xs text-green-600 font-semibold">Shop Now →</span>
                </a>

              </div>
            </div>
          </div>
        )}

      </div>
    </div>
    </>
  );
}
