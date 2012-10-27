/**
 * OvoiD.JS - WebGL Wrapper Library
 * 
 * Copyright (C) 2011 - 2012  Eric M.
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
 


/** Maximum influence/matrix count by skin
 * @constant 
 * @memberOf _global_
 * @see Ovoid.Skin */
Ovoid.MAX_JOINT_BY_SKIN = 24;


/** Maximum shader wrapping vertex attribute slot count.
 * @constant 
 * @memberOf _global_
 * @see Ovoid.Vertex
 * @see Ovoid.Shader
 * @see Ovoid.Mesh */
Ovoid.MAX_VERTEX_ATTRIB = 8;


/** Maximum shader wrapping uniform slot count.
 * @constant 
 * @memberOf _global_
 * @see Ovoid.Shader */
Ovoid.MAX_UNIFORM = 64;


/** Maximum shader wrapping uniform matrix slot count.
 * @constant 
 * @memberOf _global_
 * @see Ovoid.Shader */
Ovoid.MAX_UNIFORM_MATRIX = 64;


/** Maximum shader wrapping uniform sampler slot count.
 * @constant 
 * @memberOf _global_
 * @see Ovoid.Shader */
Ovoid.MAX_UNIFORM_SAMPLER = 16;


/** Maximum lights count for one drawing pass.
 * @constant 
 * @memberOf _global_
 * @see Ovoid.Drawer
 * @see Ovoid.Queuer */
Ovoid.MAX_LIGHT_BY_DRAW = 8;


/** Maximum body count for one drawing pass.
 * @constant 
 * @memberOf _global_
 * @see Ovoid.Drawer
 * @see Ovoid.Queuer */
Ovoid.MAX_BODY_BY_DRAW = 512;


/** Maximum layer count for one drawing pass.
 * @constant 
 * @memberOf _global_
 * @see Ovoid.Drawer
 * @see Ovoid.Queuer */
Ovoid.MAX_LAYER_BY_DRAW = 512;


/** Maximum contacts count during solver cycle.
 * @constant 
 * @memberOf _global_
 * @see Ovoid.Collider */
Ovoid.MAX_CONTACT_BY_CYCLE = 128;


/** Maximum level of detail count for mesh.
 * @constant 
 * @memberOf _global_
  @see Ovoid.Mesh */
Ovoid.MAX_MESH_LOD = 4;


/** Maximum particles count by emitter.
 * @constant 
 * @memberOf _global_
  @see Ovoid.Particles */
Ovoid.MAX_EMITTER_PARTICLES = 1024;


/** Picking offscreen render frame width.
 * @constant 
 * @memberOf _global_
 * @see Ovoid.Drawer */
Ovoid.PICKING_OFFSCREEN_FRAME_X = 1920;


/** Picking offscreen render frame height.
 * @constant 
 * @memberOf _global_
 * @see Ovoid.Drawer */
Ovoid.PICKING_OFFSCREEN_FRAME_Y = 1080;


/** Render layer stack size.
 * @constant 
 * @memberOf _global_
 * @see Ovoid.Drawer
 * @see Ovoid.Queuer */
Ovoid.MAX_RENDER_LAYER = 8;


/** Sleeping motion epsilon limit for rigid bodys 
 * @constant 
 * @memberOf _global_
 * @see Ovoid.Physics */
Ovoid.PHYSICS_MOTION_EPSILON = 0.1;


/** Maximum body intersection count.
 * @constant 
 * @memberOf _global_
 * @see Ovoid.Body */
Ovoid.MAX_BODY_INTERSECT = 64;


/** Bitmask constant 00000000000000000000000000000000 
 * @constant 
 * @memberOf _global_
 */
Ovoid.BIT0 = 0x0;


/** Bitmask constant 00000000000000000000000000000001
 * @constant 
 * @memberOf _global_
 */
Ovoid.BIT1 = 0x1;


/** Bitmask constant 00000000000000000000000000000010
 * @constant 
 * @memberOf _global_
 */
Ovoid.BIT2 = 0x2;


/** Bitmask constant 00000000000000000000000000000100
 * @constant 
 * @memberOf _global_
 */
Ovoid.BIT3 = 0x4;


/** Bitmask constant 00000000000000000000000000001000
 * @constant 
 * @memberOf _global_
 */
Ovoid.BIT4 = 0x8;


/** Bitmask constant 00000000000000000000000000010000
 * @constant 
 * @memberOf _global_
 */
Ovoid.BIT5 = 0x10;


/** Bitmask constant 00000000000000000000000000100000
 * @constant 
 * @memberOf _global_
 */
Ovoid.BIT6 = 0x20;


/** Bitmask constant 00000000000000000000000001000000
 * @constant 
 * @memberOf _global_
 */
Ovoid.BIT7 = 0x40;


/** Bitmask constant 00000000000000000000000010000000
 * @constant 
 * @memberOf _global_
 */
Ovoid.BIT8 = 0x80;


/** Bitmask constant 00000000000000000000000100000000
 * @constant 
 * @memberOf _global_
 */
Ovoid.BIT9 = 0x100;


/** Bitmask constant 00000000000000000000001000000000
 * @constant 
 * @memberOf _global_
 */
Ovoid.BIT10 = 0x200;


/** Bitmask constant 00000000000000000000010000000000
 * @constant 
 * @memberOf _global_
 */
Ovoid.BIT11 = 0x400;


/** Bitmask constant 00000000000000000000100000000000
 * @constant 
 * @memberOf _global_
 */
Ovoid.BIT12 = 0x800;


/** Bitmask constant 00000000000000000001000000000000
 * @constant 
 * @memberOf _global_
 */
Ovoid.BIT13 = 0x1000;


/** Bitmask constant 00000000000000000010000000000000
 * @constant 
 * @memberOf _global_
 */
Ovoid.BIT14 = 0x2000;


/** Bitmask constant 00000000000000000100000000000000 
 * @constant 
 * @memberOf _global_ */
Ovoid.BIT15 = 0x4000;


/** Bitmask constant 00000000000000001000000000000000 
 * @constant 
 * @memberOf _global_ */
Ovoid.BIT16 = 0x8000;


/** Bitmask constant 00000000000000010000000000000000
 * @constant 
 * @memberOf _global_ */
Ovoid.BIT17 = 0x10000;


/** Bitmask constant 00000000000000100000000000000000
 * @constant 
 * @memberOf _global_ */
Ovoid.BIT18 = 0x20000;


/** Bitmask constant 00000000000001000000000000000000
 * @constant 
 * @memberOf _global_ */
Ovoid.BIT19 = 0x40000;


/** Bitmask constant 00000000000010000000000000000000
 * @constant 
 * @memberOf _global_ */
Ovoid.BIT20 = 0x80000;


/** Bitmask constant 00000000000100000000000000000000
 * @constant 
 * @memberOf _global_ */
Ovoid.BIT21 = 0x100000;


/** Bitmask constant 00000000001000000000000000000000
 * @constant 
 * @memberOf _global_ */
Ovoid.BIT22 = 0x200000;


/** Bitmask constant 00000000010000000000000000000000
 * @constant 
 * @memberOf _global_ */
Ovoid.BIT23 = 0x400000;


/** Bitmask constant 00000000100000000000000000000000
 * @constant 
 * @memberOf _global_ */
Ovoid.BIT24 = 0x800000;


/** Bitmask constant 00000001000000000000000000000000
 * @constant 
 * @memberOf _global_ */
Ovoid.BIT25 = 0x1000000;


/** Bitmask constant 00000010000000000000000000000000
 * @constant 
 * @memberOf _global_ */
Ovoid.BIT26 = 0x2000000;


/** Bitmask constant 00000100000000000000000000000000
 * @constant 
 * @memberOf _global_ */
Ovoid.BIT27 = 0x4000000;


/** Bitmask constant 00001000000000000000000000000000
 * @constant 
 * @memberOf _global_ */
Ovoid.BIT28 = 0x8000000;


/** Bitmask constant 00010000000000000000000000000000
 * @constant 
 * @memberOf _global_ */
Ovoid.BIT29 = 0x10000000;


/** Bitmask constant 00100000000000000000000000000000
 * @constant 
 * @memberOf _global_ */
Ovoid.BIT30 = 0x20000000;


/** Bitmask constant 01000000000000000000000000000000
 * @constant 
 * @memberOf _global_ */
Ovoid.BIT31 = 0x40000000;


/** Bitmask constant 10000000000000000000000000000000
 * @constant 
 * @memberOf _global_ */
Ovoid.BIT32 = 0x80000000;



/** The Pi constant number.
 * @constant 
 * @memberOf _global_*/
Ovoid._PI = 3.141592653589793238462643383279;


/** Alf of Pi constant number.
 * @constant 
 * @memberOf _global_*/
Ovoid._alfPI = 1.570796326794896619231321691639;


/** Two Pi constant number.
 * @constant 
 * @memberOf _global_*/
Ovoid._2PI = 6.28318530717958647692528676655;


/** 32 bit float maximum value.
 * @constant 
 * @memberOf _global_*/
Ovoid.FLOAT_MAX = 3.402823466e+38;


/** 32 bit float minimum value.
 * @constant 
 * @memberOf _global_*/
Ovoid.FLOAT_MIN = -1.0737418e+008;


/** 32 bit integer minimum value.
 * @constant 
 * @memberOf _global_*/
Ovoid.INT_MIN = -2147483647;


/** 32 bit integer maximum value.
 * @constant 
 * @memberOf _global_*/
Ovoid.INT_MAX = 2147483647;


/** 32 bit unsigned integer maximum value.
 * @constant 
 * @memberOf _global_*/
Ovoid.UINT_MAX = 4294967295;


// Ovoid.DOUBLE_EPSILON = 4.9406564584124654e-32
/** 32 bit float epsilon value.
 * @constant 
 * @memberOf _global_*/
Ovoid.FLOAT_EPSILON = 1.19209290e-07;


/** Symbolic constant bitmask for node type.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Node */
Ovoid.NODE = Ovoid.BIT1;


/** Symbolic constant bitmask for node type.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Node */
Ovoid.TEXTURE = Ovoid.BIT2;


/** Symbolic constant bitmask for node type.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Node */
Ovoid.MATERIAL = Ovoid.BIT3;


/** Symbolic constant bitmask for node type.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Node */
Ovoid.TRANSFORM = Ovoid.BIT4;


/** Symbolic constant bitmask for node type.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Node */
Ovoid.BODY = Ovoid.BIT5;


/** Symbolic constant bitmask for node type.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Node */
Ovoid.JOINT = Ovoid.BIT6;


/** Symbolic constant bitmask for node type.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Node */
Ovoid.CAMERA = Ovoid.BIT7;


/** Symbolic constant bitmask for node type.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Node */
Ovoid.LIGHT = Ovoid.BIT8;


/** Symbolic constant bitmask for node type.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Node */
Ovoid.MESH = Ovoid.BIT9;


/** Symbolic constant bitmask for node type.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Node */
Ovoid.SKIN = Ovoid.BIT10;


/** Symbolic constant bitmask for node type.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Node */
Ovoid.ANIMATION = Ovoid.BIT11;


/** Symbolic constant bitmask for node type.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Node */
Ovoid.AIM = Ovoid.BIT12;


/** Symbolic constant bitmask for node type.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Node */
Ovoid.ACTION = Ovoid.BIT13;


/** Symbolic constant bitmask for node type.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Node */
Ovoid.CONSTRAINT = Ovoid.BIT14;


/** Symbolic constant bitmask for node type.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Node */
Ovoid.PHYSICS = Ovoid.BIT15;


/** Symbolic constant bitmask for node type.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Node */
Ovoid.EMITTER = Ovoid.BIT16;


/** Symbolic constant bitmask for node type.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Node */
Ovoid.TRACK = Ovoid.BIT17;


/** Symbolic constant bitmask for node type.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Node */
Ovoid.EXPRESSION = Ovoid.BIT18;


/** Symbolic constant bitmask for node type.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Node */
Ovoid.TEXT = Ovoid.BIT20;


/** Symbolic constant bitmask for node type.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Node */
Ovoid.LAYER = Ovoid.BIT21;


/** Symbolic constant bitmask for node type.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Node */
Ovoid.AUDIO = Ovoid.BIT30;


/** Symbolic constant bitmask for node type.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Node */
Ovoid.SOUND = Ovoid.BIT31;


/** Symbolic constant bitmask for node cach.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Node */
Ovoid.CACH_ALL = Ovoid.BIT0;


/** Symbolic constant bitmask for node cach.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Node */
Ovoid.CACH_MATRIX = Ovoid.BIT1;


/** Symbolic constant bitmask for node cach.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Node */
Ovoid.CACH_TRANSFORM = Ovoid.BIT2;


/** Symbolic constant bitmask for node cach.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Node */
Ovoid.CACH_WORLD = Ovoid.BIT3;


/** Symbolic constant bitmask for node cach.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Node */
Ovoid.CACH_VIEWPROJ = Ovoid.BIT4;


/** Symbolic constant bitmask for node cach.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Node */
Ovoid.CACH_GEOMETRY = Ovoid.BIT5;


/** Symbolic constant bitmask for node cach.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Node */
Ovoid.CACH_LIGHT = Ovoid.BIT6;


/** Symbolic constant bitmask for node cach.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Node */
Ovoid.CACH_BOUNDING_SHAPE = Ovoid.BIT7;


/** Symbolic constant bitmask for node cach.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Node */
Ovoid.CACH_SKIN = Ovoid.BIT8;


/** Symbolic constant bitmask for node cach.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Node */
Ovoid.CACH_LAYER = Ovoid.BIT9;


/** Symbolic constant bitmask for node cach.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Node */
Ovoid.CACH_ACTION = Ovoid.BIT10;


/** Symbolic constant bitmask for node cach.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Node */
Ovoid.CACH_INFLUENCES = Ovoid.BIT11;


/** Symbolic constant bitmask for node cach.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Node */
Ovoid.CACH_PHYSICS = Ovoid.BIT12;


/** Symbolic constant bitmask for node cach.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Node */
Ovoid.CACH_SOUND = Ovoid.BIT13;


/** Symbolic constant bitmask for node cach.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Node */
Ovoid.CACH_EXPRESSION = Ovoid.BIT14;


/** Symbolic constant for transform space coordinates.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Transform
 */
Ovoid.WORLD = 0;


/** Symbolic constant for transform space coordinates.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Transform
 */
Ovoid.LOCAL = 1;


/** Symbolic constant for transform method.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Transform
 */
Ovoid.ABSOLUTE = 1;


/** Symbolic constant for transform method.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Transform
 */
Ovoid.RELATIVE = 0;


/** Symbolic constant for light kind.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Light
 */
Ovoid.LIGHT_AMBIENT = 0;


/** Symbolic constant for light kind.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Light
 */
Ovoid.LIGHT_DIRECTIONAL = 1;


/** Symbolic constant for light kind.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Light
 */
Ovoid.LIGHT_POINT = 2;


/** Symbolic constant for light kind.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Light
 */
Ovoid.LIGHT_SPOT = 3;


/** Symbolic constant for material component.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Material
 */
Ovoid.AMBIENT = 0;


/** Symbolic constant for material component.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Material
 */
Ovoid.DIFFUSE = 1;


/** Symbolic constant for material component.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Material
 */
Ovoid.SPECULAR = 2;


/** Symbolic constant for material component.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Material
 */
Ovoid.EMISSIVE = 3;


/** Symbolic constant for material component.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Material
 */
Ovoid.REFLECT = 4;


/** Symbolic constant for material component.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Material
 */
Ovoid.NORMAL = 5;


/** Symbolic constant for interpolation type.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Collada
 * @see Ovoid.Animation
 */
Ovoid.INTERPOLATION_CSPLINE = 0;
/** Symbolic constant for interpolation type.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Collada
 * @see Ovoid.Animation
 */
Ovoid.INTERPOLATION_HSPLINE = 1;
/** Symbolic constant for interpolation type.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Collada
 * @see Ovoid.Animation
 */
Ovoid.INTERPOLATION_BSPLINE = 2;


/** Symbolic constant bitmask for animation channel.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Animation
 */
Ovoid.ANIMATION_CHANNEL_TRANSLATE = Ovoid.BIT21;


/** Symbolic constant bitmask for animation channel.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Animation
 */
Ovoid.ANIMATION_CHANNEL_TRANSLATE_X = Ovoid.BIT1 | Ovoid.BIT21;


/** Symbolic constant bitmask for animation channel.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Animation
 */
Ovoid.ANIMATION_CHANNEL_TRANSLATE_Y = Ovoid.BIT2 | Ovoid.BIT21;


/** Symbolic constant bitmask for animation channel.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Animation
 */
Ovoid.ANIMATION_CHANNEL_TRANSLATE_Z = Ovoid.BIT3 | Ovoid.BIT21;


/** Symbolic constant bitmask for animation channel.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Animation
 */
Ovoid.ANIMATION_CHANNEL_ROTATE = Ovoid.BIT22;


/** Symbolic constant bitmask for animation channel.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Animation
 */
Ovoid.ANIMATION_CHANNEL_ROTATE_X = Ovoid.BIT4 | Ovoid.BIT22;


/** Symbolic constant bitmask for animation channel.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Animation
 */
Ovoid.ANIMATION_CHANNEL_ROTATE_Y = Ovoid.BIT5 | Ovoid.BIT22;


/** Symbolic constant bitmask for animation channel.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Animation
 */
Ovoid.ANIMATION_CHANNEL_ROTATE_Z = Ovoid.BIT6 | Ovoid.BIT22;


/** Symbolic constant bitmask for animation channel.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Animation
 */
Ovoid.ANIMATION_CHANNEL_ORIENTE = Ovoid.BIT23;


/** Symbolic constant bitmask for animation channel.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Animation
 */
Ovoid.ANIMATION_CHANNEL_ORIENTE_X = Ovoid.BIT7 | Ovoid.BIT23;


/** Symbolic constant bitmask for animation channel.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Animation
 */
Ovoid.ANIMATION_CHANNEL_ORIENTE_Y = Ovoid.BIT8 | Ovoid.BIT23;


/** Symbolic constant bitmask for animation channel.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Animation
 */
Ovoid.ANIMATION_CHANNEL_ORIENTE_Z = Ovoid.BIT9 | Ovoid.BIT23;


/** Symbolic constant bitmask for animation channel.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Animation
 */
Ovoid.ANIMATION_CHANNEL_SCALE = Ovoid.BIT24;


/** Symbolic constant bitmask for animation channel.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Animation
 */
Ovoid.ANIMATION_CHANNEL_SCALE_X = Ovoid.BIT10 | Ovoid.BIT24;


/** Symbolic constant bitmask for animation channel.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Animation
 */
Ovoid.ANIMATION_CHANNEL_SCALE_Y = Ovoid.BIT11 | Ovoid.BIT24;


/** Symbolic constant bitmask for animation channel.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Animation
 */
Ovoid.ANIMATION_CHANNEL_SCALE_Z = Ovoid.BIT12 | Ovoid.BIT24;


/** Symbolic constant bitmask for animation channel.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Animation
 */
Ovoid.ANIMATION_CHANNEL_COLOR = Ovoid.BIT25;


/** Symbolic constant bitmask for animation channel.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Animation
 */
Ovoid.ANIMATION_CHANNEL_COLOR_R = Ovoid.BIT13 | Ovoid.BIT25;


/** Symbolic constant bitmask for animation channel.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Animation
 */
Ovoid.ANIMATION_CHANNEL_COLOR_G = Ovoid.BIT14 | Ovoid.BIT25;


/** Symbolic constant bitmask for animation channel.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Animation
 */
Ovoid.ANIMATION_CHANNEL_COLOR_B = Ovoid.BIT15 | Ovoid.BIT25;


/** Symbolic constant bitmask for animation channel.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Animation
 */
Ovoid.ANIMATION_CHANNEL_COLOR_A = Ovoid.BIT16 | Ovoid.BIT25;


/** Symbolic constant bitmask for animation channel.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Animation
 */
Ovoid.ANIMATION_CHANNEL_VISIBILITY = Ovoid.BIT17;


/** Symbolic constant bitmask for animation channel.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Animation
 */
Ovoid.ANIMATION_CHANNEL_TRANSFORM = Ovoid.BIT26;


/** Symbolic constant bitmask for file type importation. 
 * @constant
 * @memberOf _global_
 * @see Ovoid.Loader
 */
Ovoid.COLLADA = 0;


/** Symbolic constant bitmask for file type importation. 
 * @constant
 * @memberOf _global_
 * @see Ovoid.Loader
 */
Ovoid.OJSON = 1;


/** Symbolic constant bitmask for collada importation options. Include transform 
 * nodes for importation.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Collada
 */
Ovoid.DAE_TRANSFORMS = Ovoid.BIT1;


/** Symbolic constant bitmask for collada importation options. Include mesh 
 * nodes for importation.
  @constant
  @memberOf _global_
  @see Ovoid.Collada
 */
Ovoid.DAE_MESHS = Ovoid.BIT2;


/** Symbolic constant bitmask for collada importation options. Include light 
 * nodes for importation.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Collada
 */
Ovoid.DAE_LIGHTS = Ovoid.BIT3;


/** Symbolic constant bitmask for collada importation options. Include camera 
 * nodes for importation.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Collada
 */
Ovoid.DAE_CAMERAS = Ovoid.BIT4;


/** Symbolic constant bitmask for collada importation options. Include joint
 * nodes for importation.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Collada
 */
Ovoid.DAE_JOINTS = Ovoid.BIT5;


/** Symbolic constant bitmask for collada importation options. Include animation 
 * nodes for importation.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Collada
 */
Ovoid.DAE_ANIMATIONS = Ovoid.BIT6;


/** Symbolic constant bitmask for collada importation options. Include material
 * nodes for importation.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Collada
 */
Ovoid.DAE_MATERIALS = Ovoid.BIT7;


/** Symbolic constant bitmask for collada importation options. Include 
 * controller nodes for importation.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Collada
 */
Ovoid.DAE_CONTROLLERS = Ovoid.BIT8;


/** Symbolic constant bitmask for collada importation options. Include all 
 * suported world scene nodes for importation.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Collada
 */
Ovoid.DAE_WORLD_NODES = Ovoid.BIT1 |  Ovoid.BIT3 | Ovoid.BIT4 | Ovoid.BIT5;


/** Symbolic constant bitmask for collada importation options. Include all 
 * suported library nodes for importation.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Collada
 */
Ovoid.DAE_DEPENDENCY_NODES = Ovoid.BIT2 |  Ovoid.BIT6 | Ovoid.BIT7 | 
	Ovoid.BIT8;


/** Symbolic constant bitmask for collada importation options. Include all 
 * suported nodes for importation.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Collada
 */
Ovoid.DAE_ALL_NODES = Ovoid.BIT1 |
    Ovoid.BIT2 | Ovoid.BIT3 | Ovoid.BIT4 |
    Ovoid.BIT5 | Ovoid.BIT6 | Ovoid.BIT7 |
    Ovoid.BIT8;


/** Symbolic constant bitmask for collada importation options. Ignore tangent 
 * data and force linear-cubic-polynomial interpolation for animation.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Collada
 */
Ovoid.DAE_FORCE_CSPLINE = Ovoid.BIT9;


/** Symbolic constant bitmask for collada importation options. Aplly vertices
 * optimization for imported mesh.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Collada
 */
Ovoid.DAE_OPTIMIZE_MESH_VERTICES = Ovoid.BIT10;


/** Symbolic constant bitmask for collada importation options. Aplly triangles
 * optimization for imported mesh.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Collada
 * @see Ovoid.Mesh
 */
Ovoid.DAE_OPTIMIZE_MESH_TRIANGLES = Ovoid.BIT11;


/** Symbolic constant bitmask for collada importation options. Aplly all
 * optimizations for imported mesh.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Collada
 * @see Ovoid.Mesh
 */
Ovoid.DAE_OPTIMIZE_ALL = Ovoid.BIT10 | Ovoid.BIT11;


/** Symbolic constant bitmask for collada importation options. Apply 
 * Maya specific artifacts fixs (not yet used).
 * @constant
 * @memberOf _global_
 * @see Ovoid.Collada
 */
Ovoid.DAE_MAYA_FIXS = Ovoid.BIT13;


/** Symbolic constant bitmask for collada importation options. Apply 
 * Blender specific artifacts fixs (not yet used).
 * @constant
 * @memberOf _global_
 * @see Ovoid.Collada
 */
Ovoid.DAE_BLENDER_FIXS = Ovoid.BIT14;


/** Symbolic constant bitmask for collada importation options. Reparent root
 * influence joint to skin body.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Collada
 */
Ovoid.DAE_REPARENT_SKIN = Ovoid.BIT15;


/** Symbolic constant bitmask for collada importation options. Whene possible,
 * link imported library nodes to allready existing nodes's destination scene.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Collada
 */
Ovoid.DAE_MERGE_DEPENDENCIES = Ovoid.BIT16;


/** Symbolic constant bitmask for collada importation options. Create a track 
 * node that compile all scene's animation nodes.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Collada
 */
Ovoid.DAE_CREATE_TRACK = Ovoid.BIT17;


/** Symbolic constant bitmask for collada importation options. Create a track 
 * node that compile all scene's animation nodes.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Collada
 */
Ovoid.DAE_CONVERT_UPAXIS = Ovoid.BIT18;


/** Symbolic constant for frame mode.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Frame */
Ovoid.FRAME_FIXED_SIZE = 0;


/** Symbolic constant for frame mode.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Frame */
Ovoid.FRAME_FULL_CLIENT = 1;


/** Symbolic constant for frame mode.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Frame */
Ovoid.FRAME_FULL_SCREEN = 2;


/** Symbolic constant for Audio API mode.
 * @constant
 * @memberOf _global_
 */
Ovoid.HTML5_AUDIO = 1;


/** Symbolic constant for Mozilla API mode.
 * @constant
 * @memberOf _global_
 */
Ovoid.MOZ_AUDIO_API = 2;


/** Symbolic constant for Webkit Audio API mode.
 * @constant
 * @memberOf _global_
 */
Ovoid.WEBKIT_AUDIO_API = 3;


/** Symbolic constant for drawer pipeline.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Drawer
 */
Ovoid.PIPE_RP_GEOMETRY = 20;


/** Symbolic constant for drawer pipeline.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Drawer
 */
Ovoid.PIPE_RP_PARTICLE = 22;


/** Symbolic constant for drawer pipeline.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Drawer
 */
Ovoid.PIPE_RP_LAYER = 23;


/** Symbolic constant for drawer pipeline.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Drawer
 */
Ovoid.PIPE_RP_STRING = 24;


/** Symbolic constant for drawer pipeline.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Drawer
 */
Ovoid.PIPE_RP_BILLBOARD = 27;


/** Symbolic constant for drawer pipeline.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Drawer
 */
Ovoid.PIPE_L2_GEOMETRY_LP = 0;


/** Symbolic constant for drawer pipeline.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Drawer
 */
Ovoid.PIPE_L2_GEOMETRY_1P = 1;


/** Symbolic constant for drawer pipeline.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Drawer
 */
Ovoid.PIPE_L1_GEOMETRY_LP = 10;


/** Symbolic constant for drawer pipeline.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Drawer
 */
Ovoid.PIPE_L1_GEOMETRY_1P = 11;


/** Symbolic constant for drawer pipeline.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Drawer
 */
Ovoid.PIPE_L0_GEOMETRY_LP = 13;


/** Symbolic constant for drawer pipeline.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Drawer
 */
Ovoid.PIPE_L0_GEOMETRY_1P = 14;


/** Symbolic constant for drawer pipeline.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Drawer
 */
Ovoid.PIPE_PARTICLE = 2;


/** Symbolic constant for drawer pipeline.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Drawer
 */
Ovoid.PIPE_LAYER = 3;


/** Symbolic constant for drawer pipeline.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Drawer
 */
Ovoid.PIPE_STRING = 4;


/** Symbolic constant for drawer pipeline.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Drawer
 */
Ovoid.PIPE_HELPER = 5;


/** Symbolic constant for drawer pipeline.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Drawer
 */
Ovoid.PIPE_SHADOW_VOLUME = 6;


/** Symbolic constant for drawer pipeline.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Drawer
 */
Ovoid.PIPE_BILLBOARD = 7;


/** Symbolic constant bitmask for vertex format. float[4] Position component.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Shader
 * @see Ovoid.Vertex
 * @see Ovoid.Mesh
 */
Ovoid.VERTEX_VEC4_P = Ovoid.BIT1;


/** Symbolic constant bitmask for vertex format. float[3] normal vector component.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Shader
 * @see Ovoid.Vertex
 * @see Ovoid.Mesh
 */
Ovoid.VERTEX_VEC3_N = Ovoid.BIT2;


/** Symbolic constant bitmask for vertex format. float[3] Uv coordinate component.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Shader
 * @see Ovoid.Vertex
 * @see Ovoid.Mesh
 */
Ovoid.VERTEX_VEC3_U = Ovoid.BIT3;


/** Symbolic constant bitmask for vertex format. float[3] Tangent vector component.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Shader
 * @see Ovoid.Vertex
 * @see Ovoid.Mesh
 */
Ovoid.VERTEX_VEC3_T = Ovoid.BIT4;


/** Symbolic constant bitmask for vertex format. float[3] Binormal vector component.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Shader
 * @see Ovoid.Vertex
 * @see Ovoid.Mesh
 */
Ovoid.VERTEX_VEC3_B = Ovoid.BIT5;


/** Symbolic constant bitmask for vertex format. float[4] Color component.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Shader
 * @see Ovoid.Vertex
 * @see Ovoid.Mesh
 */
Ovoid.VERTEX_VEC4_C = Ovoid.BIT6;


/** Symbolic constant bitmask for vertex format. float[4] influence Index component.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Shader
 * @see Ovoid.Vertex
 * @see Ovoid.Mesh
 */
Ovoid.VERTEX_VEC4_I = Ovoid.BIT7;


/** Symbolic constant bitmask for vertex format. float[4] influence Wheight component.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Shader
 * @see Ovoid.Vertex
 * @see Ovoid.Mesh
 */
Ovoid.VERTEX_VEC4_W = Ovoid.BIT8;


/** Symbolic constant bitmask for particles composit vertex format. 
 * @constant
 * @memberOf _global_
 * @see Ovoid.Shader
 * @see Ovoid.Emitter
 */
Ovoid.VERTEX_PARTICLE = Ovoid.BIT1|Ovoid.BIT3|Ovoid.BIT6;


/** Symbolic constant for GLSL program type. (not yet used)
 * @constant
 * @memberOf _global_
 */
Ovoid.GLSL_FRAGMENT = 0;


/** Symbolic constant for GLSL program type. (not yet used)
 * @constant
 * @memberOf _global_
 */
Ovoid.GLSL_VERTEX = 1;


/** Symbolic constant for GLSL program type. (not yet used)
 * @constant
 * @memberOf _global_
 */
Ovoid.GLSL_GEOMETRY = 2;


/** Symbolic constant for shader uniform sampler wrapping slot.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Shader */
Ovoid.SAMPLER_AMBIENT = 0;


/** Symbolic constant for shader uniform sampler wrapping slot.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Shader */
Ovoid.SAMPLER_DEFAULT = 1;


/** Symbolic constant for shader uniform sampler wrapping slot.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Shader */
Ovoid.SAMPLER_DIFFUSE = 1;


/** Symbolic constant for shader uniform sampler wrapping slot.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Shader */
Ovoid.SAMPLER_SPECULAR = 2;


/** Symbolic constant for shader uniform sampler wrapping slot.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Shader */
Ovoid.SAMPLER_EMISSIVE = 3;


/** Symbolic constant for shader uniform sampler wrapping slot.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Shader */
Ovoid.SAMPLER_REFLECT = 4;


/** Symbolic constant for shader uniform sampler wrapping slot.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Shader */
Ovoid.SAMPLER_NORMAL = 5;


/** Symbolic constant for shader uniform wrapping slot.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Shader */
Ovoid.UNIFORM_ENABLE_DIFFUSE_LIGHTING_BOOL = 0;


/** Symbolic constant for shader uniform wrapping slot.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Shader */
Ovoid.UNIFORM_ENABLE_AMBIENT_LIGHTING_BOOL = 1;


/** Symbolic constant for shader uniform wrapping slot.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Shader */
Ovoid.UNIFORM_ENABLE_SPECULAR_BOOL = 2;


/** Symbolic constant for shader uniform wrapping slot.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Shader */
Ovoid.UNIFORM_ENABLE_REFLECT_BOOL = 3;


/** Symbolic constant for shader uniform wrapping slot.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Shader */
Ovoid.UNIFORM_ENABLE_PARALAX_BOOL = 4;


/** Symbolic constant for shader uniform wrapping slot.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Shader */
Ovoid.UNIFORM_ENABLE_MATERIAL_BOOL = 5;


/** Symbolic constant for shader uniform wrapping slot.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Shader */
Ovoid.UNIFORM_ENABLE_VERTEX_WEIGHT_BOOL = 6;


/** Symbolic constant for shader uniform wrapping slot.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Shader */
Ovoid.UNIFORM_ENABLE_COMPUT_TANGENT_BOOL = 7;


/** Symbolic constant for shader uniform wrapping slot.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Shader */
Ovoid.UNIFORM_ZOFFSET_FLOAT = 8;


/** Symbolic constant for shader uniform wrapping slot.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Shader */
Ovoid.UNIFORM_COLOR_VEC4 = 9;


/** Symbolic constant for shader uniform wrapping slot.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Shader */
Ovoid.UNIFORM_MATERIAL_AMBIENT_VEC4 = 10;


/** Symbolic constant for shader uniform wrapping slot.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Shader */
Ovoid.UNIFORM_MATERIAL_DIFFUSE_VEC4 = 11;


/** Symbolic constant for shader uniform wrapping slot.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Shader */
Ovoid.UNIFORM_MATERIAL_SPECULAR_VEC4 = 12;


/** Symbolic constant for shader uniform wrapping slot.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Shader */
Ovoid.UNIFORM_MATERIAL_EMISSIVE_VEC4 = 13;


/** Symbolic constant for shader uniform wrapping slot.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Shader */
Ovoid.UNIFORM_MATERIAL_REFLECT_VEC4 = 14;


/** Symbolic constant for shader uniform wrapping slot.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Shader */
Ovoid.UNIFORM_MATERIAL_SHININESS_FLOAT = 15;


/** Symbolic constant for shader uniform wrapping slot.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Shader */
Ovoid.UNIFORM_MATERIAL_OPACITY_FLOAT = 16;


/** Symbolic constant for shader uniform wrapping slot.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Shader */
Ovoid.UNIFORM_MATERIAL_REFLECTIVITY_FLOAT = 17;


/** Symbolic constant for shader uniform wrapping slot.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Shader */
Ovoid.UNIFORM_MATERIAL_BUMPINESS_FLOAT = 18;


/** Symbolic constant for shader uniform wrapping slot.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Shader */
Ovoid.UNIFORM_LIGHT_WEIGHT_FLOAT = 19;


/** Symbolic constant for shader uniform wrapping slot.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Shader */
Ovoid.UNIFORM_LIGHT_POSITION_VEC4 = 20;


/** Symbolic constant for shader uniform wrapping slot.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Shader */
Ovoid.UNIFORM_LIGHT_DIRECTION_VEC3 = 21;


/** Symbolic constant for shader uniform wrapping slot.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Shader */
Ovoid.UNIFORM_LIGHT_COLOR_VEC4 = 22;


/** Symbolic constant for shader uniform wrapping slot.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Shader */
Ovoid.UNIFORM_LIGHT_INTENSITY_FLOAT = 23;


/** Symbolic constant for shader uniform wrapping slot.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Shader */
Ovoid.UNIFORM_LIGHT_CONSTANT_ATTENUATION_FLOAT = 23;


/** Symbolic constant for shader uniform wrapping slot.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Shader */
Ovoid.UNIFORM_LIGHT_RANGE_FLOAT = 24;


/** Symbolic constant for shader uniform wrapping slot.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Shader */
Ovoid.UNIFORM_LIGHT_FALLOFF_FLOAT = 25;


/** Symbolic constant for shader uniform wrapping slot.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Shader */
Ovoid.UNIFORM_LIGHT_SPOTANGLE_FLOAT = 26;


/** Symbolic constant for shader uniform wrapping slot.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Shader */
Ovoid.UNIFORM_LIGHT_LINEAR_ATTENUATION_FLOAT = 27;


/** Symbolic constant for shader uniform wrapping slot.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Shader */
Ovoid.UNIFORM_LIGHT_ENABLED_BOOL = 28;


/** Symbolic constant for shader uniform wrapping slot.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Shader */
Ovoid.UNIFORM_LIGHT_QUADRIC_ATTENUATION_FLOAT = 29;


/** Symbolic constant for shader uniform wrapping slot.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Shader */
Ovoid.UNIFORM_EYE_POSITION_VEC4 = 30;


/** Symbolic constant for shader uniform wrapping slot.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Shader */
Ovoid.UNIFORM_EYE_DIRECTION_VEC4 = 31;


/** Symbolic constant for shader uniform wrapping slot.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Shader */
Ovoid.UNIFORM_EYE_VIEWSIZE_VEC3 = 32;


/** Symbolic constant for shader uniform wrapping slot.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Shader */
Ovoid.UNIFORM_AMBIENT_COLOR_VEC4 = 40;


/** Symbolic constant for shader uniform wrapping slot.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Shader */
Ovoid.UNIFORM_LAYER_SIZE_VEC3 = 42;


/** Symbolic constant for shader uniform matrix wrapping slot.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Shader */
Ovoid.UNIFORM_MATRIX_TRANSFORM_MAT4 = 0;


/** Symbolic constant for shader uniform matrix wrapping slot.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Shader */
Ovoid.UNIFORM_MATRIX_NORMAL_MAT3 = 1;


/** Symbolic constant for shader uniform matrix wrapping slot.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Shader */
Ovoid.UNIFORM_MATRIX_MODELVIEW_MAT4 = 2;


/** Symbolic constant for shader uniform matrix wrapping slot.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Shader */
Ovoid.UNIFORM_MATRIX_EYEVIEW_MAT4 = 3;


/** Symbolic constant for shader uniform matrix wrapping slot.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Shader */
Ovoid.UNIFORM_MATRIX_PROJECTION_MAT4 = 4;


/** Symbolic constant for shader uniform matrix wrapping slot.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Shader */
Ovoid.UNIFORM_MATRIX_LOOKAT_MAT4 = 5;


/** Symbolic constant for shader uniform matrix wrapping slot.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Shader */
Ovoid.UNIFORM_MATRIX_JOINTS_MAT4 = 6;


/** Symbolic constant for OpenGL compatible data type. (not yet used)
 * @constant
 * @memberOf _global_ */
Ovoid.BOOL = 0x8B56;


/** Symbolic constant for OpenGL compatible data type. (not yet used)
 * @constant
 * @memberOf _global_ */
Ovoid.INT = 0x1404;


/** Symbolic constant for OpenGL compatible data type. (not yet used)
 * @constant
 * @memberOf _global_ */
Ovoid.FLOAT = 0x1406;


/** Symbolic constant for OpenGL compatible data type. (not yet used)
 * @constant
 * @memberOf _global_ */
Ovoid.DOUBLE = 0x140A;


/** Symbolic constant for OpenGL compatible data type. (not yet used)
 * @constant
 * @memberOf _global_ */
Ovoid.INT_VEC2 = 0x8B53;


/** Symbolic constant for OpenGL compatible data type. (not yet used)
 * @constant
 * @memberOf _global_ */
Ovoid.INT_VEC3 = 0x8B54;


/** Symbolic constant for OpenGL compatible data type. (not yet used)
 * @constant
 * @memberOf _global_ */
Ovoid.INT_VEC4 = 0x8B55;


/** Symbolic constant for OpenGL compatible data type. (not yet used)
 * @constant
 * @memberOf _global_ */
Ovoid.FLOAT_VEC2 = 0x8B50;


/** Symbolic constant for OpenGL compatible data type. (not yet used)
 * @constant
 * @memberOf _global_ */
Ovoid.FLOAT_VEC3 = 0x8B51;


/** Symbolic constant for OpenGL compatible data type. (not yet used)
 * @constant
 * @memberOf _global_ */
Ovoid.FLOAT_VEC4 = 0x8B52;


/** Symbolic constant for OpenGL compatible data type. (not yet used)
 * @constant
 * @memberOf _global_ */
Ovoid.FLOAT_MAT2 = 0x8B5A;


/** Symbolic constant for OpenGL compatible data type. (not yet used)
 * @constant
 * @memberOf _global_ */
Ovoid.FLOAT_MAT3 = 0x8B5B;


/** Symbolic constant for OpenGL compatible data type. (not yet used)
 * @constant
 * @memberOf _global_ */
Ovoid.FLOAT_MAT4 = 0x8B5C;


/** Symbolic constant for OpenGL compatible buffer object type
 * @constant
 * @memberOf _global_
 * @see Ovoid.Mesh */
Ovoid.BUFFER_STATIC = 0x88E4; /* GL_STATIC_DRAW */


/** Symbolic constant for OpenGL compatible buffer object type
 * @constant
 * @memberOf _global_
 * @see Ovoid.Mesh */
Ovoid.BUFFER_DYNAMIC = 0x88E8; /* GL_DYNAMIC_DRAW */


/** Symbolic constant for OpenGL compatible buffer object type
 * @constant
 * @memberOf _global_
 * @see Ovoid.Mesh */
Ovoid.BUFFER_STREAM = 0x88E0; /* GL_STREAM_DRAW */


/** Symbolic constant for OpenGL compatible buffer object type
 * @constant
 * @memberOf _global_
 * @see Ovoid.Mesh */
Ovoid.BUFFER_READ = 0x88B8; /* GL_READ_ONLY */


/** Symbolic constant for OpenGL compatible buffer object type
 * @constant
 * @memberOf _global_
 * @see Ovoid.Mesh */
Ovoid.BUFFER_WRITE = 0x88B9; /* GL_WRITE_ONLY */


/** Symbolic constant for OpenGL compatible buffer object type
 * @constant
 * @memberOf _global_
 * @see Ovoid.Mesh */
Ovoid.BUFFER_READ_WRTIE = 0x88BA; /* GL_READ_WRITE */


/** Symbolic constant for texture filtering
 * @constant
 * @memberOf _global_
 * @see Ovoid.Texture */
Ovoid.FILTER_NEAREST = 0;


/** Symbolic constant for texture filtering
 * @constant
 * @memberOf _global_
 * @see Ovoid.Texture */
Ovoid.FILTER_LINEAR = 1;


/** Symbolic constant for physic object kind
 * @constant
 * @memberOf _global_
 * @see Ovoid.Physics */
Ovoid.RIGID_MASSIVE_BOX = 1;


/** Symbolic constant for physic object kind 
 * @constant
 * @memberOf _global_
 * @see Ovoid.Physics */
Ovoid.RIGID_MASSIVE_SPHERE = 2;


/** Symbolic constant for physic object kind 
 * @constant
 * @memberOf _global_
 * @see Ovoid.Physics */
Ovoid.RIGID_LANDSCAPE = 0;


/** Symbolic constant for node trigger
 * @constant
 * @memberOf _global_ */
Ovoid.MOUSE_ENTER = 0;


/** Symbolic constant for node trigger
 * @constant
 * @memberOf _global_ */
Ovoid.MOUSE_LEAVE = 1;


/** Symbolic constant for node trigger
 * @constant
 * @memberOf _global_ */
Ovoid.MOUSE_OVER = 2;


/** Symbolic constant for node trigger
 * @constant
 * @memberOf _global_ */
Ovoid.MOUSE_OVER_LEFT_DOWN = 3;


/** Symbolic constant for node trigger
 * @constant
 * @memberOf _global_ */
Ovoid.MOUSE_OVER_LEFT_UP = 4;


/** Symbolic constant for node trigger
 * @constant
 * @memberOf _global_ */
Ovoid.MOUSE_OVER_LEFT_HELD = 5;


/** Symbolic constant for node trigger
 * @constant
 * @memberOf _global_ */
Ovoid.MOUSE_OVER_MIDDLE_DOWN = 6;


/** Symbolic constant for node trigger
 * @constant
 * @memberOf _global_ */
Ovoid.MOUSE_OVER_MIDDLE_UP = 7;


/** Symbolic constant for node trigger
 * @constant
 * @memberOf _global_ */
Ovoid.MOUSE_OVER_MIDDLE_HELD = 8;


/** Symbolic constant for node trigger
 * @constant
 * @memberOf _global_ */
Ovoid.MOUSE_OVER_RIGHT_DOWN = 9;


/** Symbolic constant for node trigger
 * @constant
 * @memberOf _global_ */
Ovoid.MOUSE_OVER_RIGHT_UP = 10;


/** Symbolic constant for node trigger
 * @constant
 * @memberOf _global_ */
Ovoid.MOUSE_OVER_RIGHT_HELD = 11;


/** Symbolic constant for node trigger
 * @constant
 * @memberOf _global_ */
Ovoid.ON_GRABBED = 12;


/** Symbolic constant for node trigger
 * @constant
 * @memberOf _global_ */
Ovoid.ON_UNGRABBED = 13;


/** Symbolic constant for node trigger
 * @constant
 * @memberOf _global_ */
Ovoid.ON_INTERSECT = 14;


/** Symbolic constant for node trigger
 * @constant
 * @memberOf _global_ */
Ovoid.ON_INTERSECT_ENTER = 15;


/** Symbolic constant for node trigger
 * @constant
 * @memberOf _global_ */
Ovoid.ON_INTERSECT_LEAVE = 16;


/** Symbolic constant for key or button state
 * @constant
 * @memberOf _global_
 * @see Ovoid.Action */
Ovoid.UP = 0;


/** Symbolic constant for key or button state
 * @constant
 * @memberOf _global_
 * @see Ovoid.Action */
Ovoid.DOWN = 1;


/** Symbolic constant for key or button state
 * @constant
 * @memberOf _global_
 * @see Ovoid.Action */
Ovoid.HELD = 2;


/** Symbolic constant for mouse button
 * @constant
 * @memberOf _global_ */
Ovoid.MB_LEFT = 0;


/** Symbolic constant for mouse button
 * @constant
 * @memberOf _global_ */
Ovoid.MB_MIDDLE = 1;


/** Symbolic constant for mouse button
 * @constant
 * @memberOf _global_ */
Ovoid.MB_RIGHT = 2;


/** Symbolic constant for mouse wheel
 * @constant
 * @memberOf _global_ */
Ovoid.MOUSE_WHEEL = 7;


/** Symbolic constant for key hold modifier
 * @constant
 * @memberOf _global_ */
Ovoid.CTR_HELD = 1;


/** Symbolic constant for key hold modifier
 * @constant
 * @memberOf _global_ */
Ovoid.ALT_HELD = 2;


/** Symbolic constant for key hold modifier
 * @constant
 * @memberOf _global_ */
Ovoid.SHF_HELD = 3;


/** Symbolic constant for key hold modifier
 * @constant
 * @memberOf _global_ */
Ovoid.LSU_HELD = 4;


/** Symbolic constant for key hold modifier
 * @constant
 * @memberOf _global_ */
Ovoid.RSU_HELD = 5;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_BACKSPACE = 8;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_TAB = 9;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_ENTER = 13;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_SHIFT = 16;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_CTRL = 17;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_ALT = 18;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_BREAK = 19;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_CAPSLOCK = 20;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_ESCAPE = 27;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_PGUP = 33;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_PGDN = 34;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_END = 35;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_HOME = 36;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_LARROW = 37;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_UARROW = 38;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_RARROW = 39;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_DARROW = 40;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_INS = 45;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_DEL = 46;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_0 = 48;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_1 = 49;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_2 = 50;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_3 = 51;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_4 = 52;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_5 = 53;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_6 = 54;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_7 = 55;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_8 = 56;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_9 = 57;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_A = 65;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_B = 66;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_C = 67;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_D = 68;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_E = 69;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_F = 70;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_G = 71;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_H = 72;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_I = 73;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_J = 74;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_K = 75;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_L = 76;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_M = 77;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_N = 78;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_O = 79;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_P = 80;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_Q = 81;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_R = 82;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_S = 83;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_T = 84;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_U = 85;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_V = 86;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_W = 87;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_X = 88;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_Y = 89;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_Z = 90;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_LSUPER = 91;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_RSUPER = 92;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_SELECT = 93;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_NP0 = 96;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_NP1 = 97;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_NP2 = 98;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_NP3 = 99;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_NP4 = 100;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_NP5 = 101;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_NP6 = 102;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_NP7 = 103;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_NP8 = 104;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_NP9 = 105;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_NPMUL = 106;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_NPADD = 107;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_NPSUB = 109;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_NPDOT = 110;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_NPDIV = 111;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_F1 = 112;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_F2 = 113;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_F3 = 114;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_F4 = 115;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_F5 = 116;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_F6 = 117;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_F7 = 118;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_F8 = 119;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_F9 = 120;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_F10 = 121;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_F11 = 122;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_F12 = 123;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_NUMLOCK = 144;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_SCROLLLOCK = 145;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_SEMICOLON = 186;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_EQUAL = 187;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_DASH = 189;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_PERIOD = 190;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_SLASH = 191;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_GACCENT = 192;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_LBRACKET = 219;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_BACKSLASH = 220;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_RBRACKET = 221;


/** Symbolic constant for key code.
 * @constant
 * @memberOf _global_ */
Ovoid.KB_SQUOTE = 222;

/** Default GLSL Wrap map Json string for drawer basic init.
 * @constant
 * @memberOf _global_ */
Ovoid.GLSL_WRAPMAP = '{"OJSON":1,"type":"glslmap","wrapmap": {"attribute":[{"id":1,"name":"p"},{"id":2,"name":"n"},{"id":4,"name":"u"},{"id":8,"name":"t"},{"id":16,"name":"b"},{"id":32,"name":"c"},{"id":64,"name":"i"},{"id":128,"name":"w"}],"uniform":[{"id":0,"name":"ENd"},{"id":1,"name":"ENa"},{"id":2,"name":"ENs"},{"id":3,"name":"ENr"},{"id":4,"name":"ENp"},{"id":5,"name":"ENm"},{"id":6,"name":"ENw"},{"id":7,"name":"ENt"},{"id":8,"name":"Z"},{"id":9,"name":"C"},{"id":10,"name":"Ma"},{"id":11,"name":"Md"},{"id":12,"name":"Ms"},{"id":13,"name":"Me"},{"id":14,"name":"Mr"},{"id":15,"name":"Mi"},{"id":16,"name":"Mo"},{"id":17,"name":"My"},{"id":18,"name":"Mb"},{"id":19,"name":"Lw"},{"id":20,"name":"Lp"},{"id":21,"name":"Ld"},{"id":22,"name":"Lc"},{"id":23,"name":"Li"},{"id":23,"name":"Lac"},{"id":24,"name":"Lr"},{"id":25,"name":"Lf"},{"id":26,"name":"La"},{"id":27,"name":"Lal"},{"id":28,"name":"Le"},{"id":29,"name":"Laq"},{"id":30,"name":"Ep"},{"id":31,"name":"Ed"},{"id":32,"name":"Es"},{"id":40,"name":"Ac"},{"id":42,"name":"Ls"},{"symbol":"UNIFORM_FOG_COLOR_VEC4","id":44,"name":"Fc"},{"symbol":"UNIFORM_FOG_DENSITY_FLOAT","id":45,"name":"Fd"}],"uniformMatrix":[{"id":0,"name":"MXF"},{"id":1,"name":"MNR"},{"id":2,"name":"MMV"},{"id":3,"name":"MEV"},{"id":4,"name":"MPJ"},{"id":5,"name":"MLA"},{"id":6,"name":"MJT"}],"uniformSampler":[{"id":1,"name":"Sd"},{"id":0,"name":"Sa"},{"id":1,"name":"Sd"},{"id":2,"name":"Ss"},{"id":3,"name":"Se"},{"id":4,"name":"Sr"},{"id":5,"name":"Sn"}]}}';


/** Default built-in Glsl vertex shader string.
 * @constant
 * @memberOf _global_ */
Ovoid.GLSL_P_VS='attribute vec4 p;uniform mat4 MXF;uniform mat4 MEV;void main(void){gl_Position=MEV*MXF*p;}';

/** Default built-in Glsl vertex shader string.
 * @constant
 * @memberOf _global_ */
Ovoid.GLSL_PU_VS='attribute vec4 p;attribute vec3 u;uniform mat4 MXF;uniform mat4 MEV;varying vec2 Vu;void main(void){Vu=u.xy;gl_Position=MEV*MXF*p;}';


/** Default built-in Glsl vertex shader string.
 * @constant
 * @memberOf _global_ */
Ovoid.GLSL_PC_VS='attribute vec4 p;attribute vec4 c;uniform mat4 MEV;uniform mat4 MXF;varying vec4 Vc;void main(void){Vc=c;gl_Position=MEV*(MXF*p);}';


/** Default built-in Glsl vertex shader string.
 * @constant
 * @memberOf _global_ */
Ovoid.GLSL_P_ZSRING_VS='attribute vec4 p;uniform mat4 MXF;uniform mat4 MEV;uniform vec4 Ep;void main(void){gl_PointSize=p.z;gl_Position=MEV*MXF*vec4(p.xy,0.0,1.0);}';


/** Default built-in Glsl vertex shader string.
 * @constant
 * @memberOf _global_ */
Ovoid.GLSL_P_ZWSRING_VS='attribute vec4 p;uniform mat4 MXF;uniform mat4 MEV;varying float a;void main(void){a=p.w;gl_PointSize=p.z;gl_Position=MEV*MXF*vec4(p.xy,0.0,1.0);}';


/** Default built-in Glsl vertex shader string.
 * @constant
 * @memberOf _global_ */
Ovoid.GLSL_C_TEX_STRING_FS='precision highp float;uniform vec4 C;uniform sampler2D Sd;varying float a;vec2 Gu;void main(void){Gu.s=(gl_PointCoord.s*0.0625)+(floor(mod(a,16.0))*0.0625);Gu.t=(1.0-(gl_PointCoord.t*0.0625))-(floor(a/16.0)*0.0625);gl_FragColor=texture2D(Sd, Gu)*C;}';


/** Default built-in Glsl vertex shader string.
 * @constant
 * @memberOf _global_ */
Ovoid.GLSL_PU_PARTICLE_VS='attribute vec4 p;attribute vec3 u;uniform mat4 MEV;uniform vec4 Ep;void main(void){gl_PointSize=((u.z*10.0)/distance(p,Ep));gl_Position=MEV*p;}';


/** Default built-in Glsl vertex shader string.
 * @constant
 * @memberOf _global_ */                                                                                                                       
Ovoid.GLSL_PUC_PARTICLE_VS='attribute vec4 p;attribute vec3 u;attribute vec4 c;uniform mat4 MEV;uniform vec4 Ep;varying vec4 Vc;void main(void){Vc=c;gl_PointSize=((u.z*10.0)/abs(distance(p,Ep)));gl_Position=MEV*p;}';


/** Default built-in Glsl vertex shader string.
 * @constant
 * @memberOf _global_ */                                                                                                                       
/*Ovoid.GLSL_PU_BILLBOARD_VS='attribute vec4 p;attribute vec3 u;uniform mat4 MPJ;uniform mat4 MLA;uniform mat4 MXF;varying vec2 Vu;void main(void){Vu=u.xy;gl_Position=MPJ*(MLA*vec4(0.0,0.0,0.0,1.0)+(MXF*p));}';*/
Ovoid.GLSL_PU_BILLBOARD_VS='attribute vec4 p;attribute vec3 u;uniform mat4 MPJ;uniform mat4 MLA;uniform mat4 MXF;varying vec2 Vu;varying float z;void main(void){Vu=u.xy;gl_Position=MPJ*((MLA*MXF)*vec4(0.0,0.0,0.0,1.0)+(p*MXF[0][0]));}';

/** Default built-in Glsl vertex shader string.
 * @constant
 * @memberOf _global_ */
Ovoid.GLSL_PIW_HYBRID_VS='#define MA '+Ovoid.MAX_JOINT_BY_SKIN+'\nattribute vec4 p;attribute vec4 i;attribute vec4 w;uniform bool ENw;uniform mat4 MEV;uniform mat4 MXF[MA];vec4 Vp;void main(void){if(ENw){Vp=vec4(0.0,0.0,0.0,0.0);Vp+=(MXF[int(i.x)]*p)*w.x;Vp+=(MXF[int(i.y)]*p)*w.y;Vp+=(MXF[int(i.z)]*p)*w.z;Vp+=(MXF[int(i.w)]*p)*w.w;}else{Vp=MXF[0]*p;}gl_Position=MEV*Vp;}';


/** Default built-in Glsl vertex shader string.
 * @constant
 * @memberOf _global_ */
Ovoid.GLSL_PNUIW_HYBRID_VS='#define MA '+Ovoid.MAX_JOINT_BY_SKIN+'\nattribute vec4 p;attribute vec3 n;attribute vec3 u;attribute vec4 i;attribute vec4 w;uniform bool ENw;uniform mat4 MEV;uniform mat4 MXF[MA];uniform mat3 MNR[MA];varying vec4 Vp;varying vec3 Vn;varying vec2 Vu;void main(void){if(ENw){Vp=vec4(0.0,0.0,0.0,0.0);Vn=vec3(0.0,0.0,0.0);Vp+=(MXF[int(i.x)]*p)*w.x;Vn+=(MNR[int(i.x)]*n)*w.x;Vp+=(MXF[int(i.y)]*p)*w.y;Vn+=(MNR[int(i.y)]*n)*w.y;Vp+=(MXF[int(i.z)]*p)*w.z;Vn+=(MNR[int(i.z)]*n)*w.z;Vp+=(MXF[int(i.w)]*p)*w.w;Vn+=(MNR[int(i.w)]*n)*w.w;}else{Vp=MXF[0]*p;Vn=MNR[0]*n;}Vu=u.xy;gl_Position=MEV*Vp;}';


/** Default built-in Glsl vertex shader string.
 * @constant
 * @memberOf _global_ */
Ovoid.GLSL_VL_PNUIW_HYBRID_LP_VS='#define MA '+Ovoid.MAX_JOINT_BY_SKIN+'\nattribute vec4 p;attribute vec3 n;attribute vec3 u;attribute vec4 i;attribute vec4 w;uniform bool ENd;uniform bool ENw;uniform mat4 MEV;uniform mat4 MXF[MA];uniform mat3 MNR[MA];uniform vec4 Ep;uniform vec4 Lp;uniform vec3 Ld;uniform vec4 Lc;uniform float Li;uniform float Lr;uniform float Lf;uniform float La;uniform float My;uniform float Mi;varying vec4 Vp;varying vec3 Vn;varying vec2 Vu;varying vec4 Cd;varying vec4 Cs;vec3 LV, R, EV;float LT, Fw;void main(void){if(ENw){Vp=vec4(0.0,0.0,0.0,0.0);Vn=vec3(0.0,0.0,0.0);Vp+=(MXF[int(i.x)]*p)*w.x;Vn+=(MNR[int(i.x)]*n)*w.x;Vp+=(MXF[int(i.y)]*p)*w.y;Vn+=(MNR[int(i.y)]*n)*w.y;Vp+=(MXF[int(i.z)]*p)*w.z;Vn+=(MNR[int(i.z)]*n)*w.z;Vp+=(MXF[int(i.w)]*p)*w.w;Vn+=(MNR[int(i.w)]*n)*w.w;}else{Vp=MXF[0]*p;Vn=MNR[0]*n;}Vu=u.xy;gl_Position=MEV*Vp;Cd=vec4(0.0,0.0,0.0,0.0);Cs=vec4(0.0,0.0,0.0,0.0);if(ENd){EV=normalize(Ep-Vp).xyz;if(Lp.w==1.0){LV=normalize(Lp-Vp).xyz;LT=max(dot(Vn,LV),0.0);Fw=clamp((-dot(LV,Ld)-(cos(La)))/(Lf),0.0,1.0);}else{LV=Ld;LT=max(dot(Vn,LV),0.0);Fw=1.0;}Cd+=(Lc*Li*LT)*Fw;R=normalize(reflect(-LV,Vn));Cs+=Lc*Li*(pow(max(dot(R,EV),0.0),Mi))*Fw;}}';


/** Default built-in Glsl vertex shader string.
 * @constant
 * @memberOf _global_ */
Ovoid.GLSL_VL_PNUIW_HYBRID_1P_VS='#define MA '+Ovoid.MAX_JOINT_BY_SKIN+'\n#define ML '+Ovoid.MAX_LIGHT_BY_DRAW+'\nattribute vec4 p;attribute vec3 n;attribute vec3 u;attribute vec4 i;attribute vec4 w;uniform bool ENw;uniform mat4 MEV;uniform mat4 MXF[MA];uniform mat3 MNR[MA];uniform vec4 Ep;uniform vec4 Lp[ML];uniform vec3 Ld[ML];uniform vec4 Lc[ML];uniform float Li[ML];uniform float Lr[ML];uniform float Lf[ML];uniform float La[ML];uniform bool Le[ML];uniform float My;uniform float Mi;varying vec4 Vp;varying vec3 Vn;varying vec2 Vu;varying vec4 Cd;varying vec4 Cs;vec3 LV, R, EV;float LT, Fw;void main(void){if(ENw){Vp=vec4(0.0,0.0,0.0,0.0);Vn=vec3(0.0,0.0,0.0);Vp+=(MXF[int(i.x)]*p)*w.x;Vn+=(MNR[int(i.x)]*n)*w.x;Vp+=(MXF[int(i.y)]*p)*w.y;Vn+=(MNR[int(i.y)]*n)*w.y;Vp+=(MXF[int(i.z)]*p)*w.z;Vn+=(MNR[int(i.z)]*n)*w.z;Vp+=(MXF[int(i.w)]*p)*w.w;Vn+=(MNR[int(i.w)]*n)*w.w;}else{Vp=MXF[0]*p;Vn=MNR[0]*n;}Vu=u.xy;gl_Position=MEV*Vp;Cd=vec4(0.0,0.0,0.0,0.0);Cs=vec4(0.0,0.0,0.0,0.0);EV=normalize(Ep-Vp).xyz;for(int i=0;i<ML;i++){if(Le[i]){if(Lp[i].w==1.0){LV=normalize(Lp[i]-Vp).xyz;LT=max(dot(Vn,LV),0.0);Fw=clamp((-dot(LV,Ld[i])-(cos(La[i])))/(Lf[i]), 0.0, 1.0);}else{LV=Ld[i];LT=max(dot(Vn,LV),0.0);Fw=1.0;}Cd+=(Lc[i]*Li[i]*LT)*Fw;R=normalize(reflect(-LV,Vn));Cs+=Lc[i]*Li[i]*(pow(max(dot(R,EV),0.0),Mi))*Fw;}}}';


/** Default built-in Glsl fragment shader string.
 * @constant
 * @memberOf _global_ */
Ovoid.GLSL_C_FS='precision highp float;uniform vec4 C;void main(void){gl_FragColor=C;}';


/** Default built-in Glsl fragment shader string.
 * @constant
 * @memberOf _global_ */
Ovoid.GLSL_C_ADEPTH_FS='precision highp float;uniform vec4 C;void main(void){gl_FragColor=C;gl_FragColor.a=gl_FragCoord.z;}';


/** Default built-in Glsl fragment shader string.
 * @constant
 * @memberOf _global_ */
Ovoid.GLSL_BLACK_FS='precision highp float;void main(void){gl_FragColor=vec4(0.0,0.0,0.0,1.0);}';


/** Default built-in Glsl fragment shader string.
 * @constant
 * @memberOf _global_ */
Ovoid.GLSL_VCC_FS='precision highp float;uniform vec4 C;varying vec4 Vc;void main(void){gl_FragColor=Vc*C;}';


/** Default built-in Glsl fragment shader string.
 * @constant
 * @memberOf _global_ */
Ovoid.GLSL_C_TEX_FS='precision highp float;uniform vec4 C;uniform sampler2D Sd;varying vec2 Vu;void main(void){gl_FragColor=texture2D(Sd,Vu)*C;}';


/** Default built-in Glsl fragment shader string.
 * @constant
 * @memberOf _global_ */
Ovoid.GLSL_VC_TEX_PARTICLE_FS='precision highp float;uniform sampler2D Sd;varying vec4 Vc;void main(void){gl_FragColor=texture2D(Sd,gl_PointCoord)*Vc;}';


/** Default built-in Glsl fragment shader string.
 * @constant
 * @memberOf _global_ */
Ovoid.GLSL_C_TEX_BILLBOARD_FS='precision highp float;uniform sampler2D Sd;uniform vec4 C;varying vec2 Vu;varying float z;void main(void){gl_FragColor=texture2D(Sd,Vu)*C;}';


/** Default built-in Glsl fragment shader string.
 * @constant
 * @memberOf _global_ */
Ovoid.GLSL_VL_ADS_1TEX_FS='precision highp float;uniform vec4 Ac;uniform sampler2D Sd;uniform bool ENa;uniform bool ENd;uniform vec4 Md;uniform vec4 Ms;uniform float Mo;uniform vec4 Fc;uniform float Fd;varying vec2 Vu;varying vec4 Cd;varying vec4 Cs;vec4 D;float Fz, Ff;void main(void){gl_FragColor=vec4(0.0,0.0,0.0,0.0);D=Md*texture2D(Sd,Vu);if(ENa)gl_FragColor+=(D*Ac);if(ENd){gl_FragColor+=(D*Cd)+(Ms*Cs);if(Fd>0.0){Fz=gl_FragCoord.z/gl_FragCoord.w;Ff=clamp(exp2(-Fd*Fd*Fz*Fz*1.442695),0.0,1.0);gl_FragColor=mix(Fc,gl_FragColor,Ff);}}gl_FragColor.a=Mo;}';


/** Default built-in Glsl fragment shader string.
 * @constant
 * @memberOf _global_ */
Ovoid.GLSL_VL_AERDS_FULLTEX_FS='precision highp float;uniform vec4 Ac;uniform sampler2D Sd;uniform sampler2D Ss;uniform sampler2D Se;uniform sampler2D Sr;uniform vec4 Ep;uniform bool ENa;uniform bool ENd;uniform vec4 Md;uniform vec4 Ma;uniform vec4 Ms;uniform vec4 Me;uniform vec4 Mr;uniform float My;uniform float Mo;uniform vec4 Fc;uniform float Fd;varying vec2 Vu;varying vec4 Cd;varying vec4 Cs;varying vec3 Vn;varying vec4 Vp;float Fz, Ff;vec4 Td;vec3 R, EV;vec2 Ru;void main(void){gl_FragColor=vec4(0.0,0.0,0.0,0.0);Td=texture2D(Sd,Vu);if(ENa){gl_FragColor=(Md*Ma*Td)*Ac;gl_FragColor+=(texture2D(Se,Vu)*Me);if(My!=0.0){EV=normalize(Ep-Vp).xyz;R=normalize(reflect(EV,Vn));Ru=(R.xy/(2.0*(1.0+abs(R.z))))+0.5;gl_FragColor+=(Mr*texture2D(Sr,Ru))*My;}gl_FragColor.a=Mo*Td.a;}if(ENd){gl_FragColor+=(Md*Td)*Cd;gl_FragColor.a=Mo*Td.a;gl_FragColor+=(Ms*texture2D(Ss,Vu))*Cs;if(Fd>0.0){Fz=gl_FragCoord.z/gl_FragCoord.w;Ff=clamp(exp2(-Fd*Fd*Fz*Fz*1.442695),0.0,1.0);gl_FragColor=mix(Fc,gl_FragColor,Ff);}}}';


/** Default built-in Glsl fragment shader string.
 * @constant
 * @memberOf _global_ */
Ovoid.GLSL_AERDS_FULLTEX_LP_FS='precision highp float;uniform bool ENd;uniform bool ENa;uniform vec4 Ep;uniform vec4 Ac;uniform vec4 Lp;uniform vec3 Ld;uniform vec4 Lc;uniform float Li;uniform float Lr;uniform float Lf;uniform float La;uniform vec4 Md;uniform vec4 Ma;uniform vec4 Ms;uniform vec4 Me;uniform vec4 Mr;uniform float Mi;uniform float My;uniform float Mo;uniform sampler2D Sa;uniform sampler2D Sd;uniform sampler2D Ss;uniform sampler2D Se;uniform sampler2D Sr;uniform vec4 Fc;uniform float Fd;varying vec4 Vp;varying vec3 Vn;varying vec2 Vu;vec4 Td;float LT, Fw, Dw, Sw, Fz, Ff;vec3 EV, R, LV;vec2 Ru;void main(void){EV=normalize(Ep-Vp).xyz;gl_FragColor=vec4(0.0,0.0,0.0,0.0);Td=texture2D(Sd,Vu);if(ENa){gl_FragColor=(Ma*Md*Td)*Ac;gl_FragColor+=(Me*texture2D(Se,Vu));if(My!=0.0){R=normalize(reflect(EV,Vn));Ru=(R.xy/(2.0*(1.0+abs(R.z))))+0.5;gl_FragColor+=(Mr*texture2D(Sr,Ru))*My;}gl_FragColor.a=Td.a*Mo;}if(ENd){if(Lp.w==1.0){LV=normalize(Lp-Vp).xyz;LT=max(dot(Vn,LV),0.0);Fw=clamp((-dot(LV,Ld)-(cos(La)))/(Lf),0.0,1.0);}else{LV=Ld;LT=max(dot(Vn,LV),0.0);Fw=1.0;}Dw=LT*Li*Fw;R=normalize(reflect(-LV,Vn));Sw=(pow(max(dot(R,EV),0.0),Mi))*Fw;gl_FragColor+=(Md*Td)*((Lc*Li)*Dw);gl_FragColor.a=Td.a*Mo;gl_FragColor+=(Ms*texture2D(Ss,Vu))*((Lc*Li)*Sw);if(Fd>0.0){Fz=gl_FragCoord.z/gl_FragCoord.w;Ff=clamp(exp2(-Fd*Fd*Fz*Fz*1.442695),0.0,1.0);gl_FragColor=mix(Fc,gl_FragColor,Ff);}}}';


/** Default built-in Glsl fragment shader string.
 * @constant
 * @memberOf _global_ */
Ovoid.GLSL_AERDS_FULLTEX_1P_FS='#define ML '+Ovoid.MAX_LIGHT_BY_DRAW+'\nprecision highp float;uniform vec4 Ep;uniform vec4 Ac;uniform vec4 Lp[ML];uniform vec3 Ld[ML];uniform vec4 Lc[ML];uniform float Li[ML];uniform float Lr[ML];uniform float Lf[ML];uniform float La[ML];uniform bool Le[ML];uniform vec4 Md;uniform vec4 Ma;uniform vec4 Ms;uniform vec4 Me;uniform vec4 Mr;uniform float Mi;uniform float My;uniform float Mo;uniform sampler2D Sa;uniform sampler2D Sd;uniform sampler2D Ss;uniform sampler2D Se;uniform sampler2D Sr;uniform vec4 Fc;uniform float Fd;varying vec4 Vp;varying vec3 Vn;varying vec2 Vu;vec4 Td;float LT, Fw, Dw, Sw, Fz, Ff;vec3 EV, R, LV;vec2 Ru;void main(void){EV=normalize(Ep-Vp).xyz;Td=texture2D(Sd,Vu);gl_FragColor=(Ma*Md*Td)*Ac;gl_FragColor+=(Me*texture2D(Se,Vu));if(My!=0.0){R=normalize(reflect(EV,Vn));Ru=(R.xy/(2.0*(1.0+abs(R.z))))+0.5;gl_FragColor+=(Mr*texture2D(Sr,Ru))*My;}for(int i=0;i<ML;i++){if(Le[i]){if(Lp[i].w==1.0){LV=normalize(Lp[i]-Vp).xyz;LT=max(dot(Vn,LV),0.0);Fw=clamp((-dot(LV,Ld[i])-(cos(La[i])))/(Lf[i]),0.0,1.0);}else{LV=Ld[i];LT=max(dot(Vn,LV),0.0);Fw=1.0;}Dw=LT*Li[i]*Fw;R=normalize(reflect(-LV,Vn));Sw=(pow(max(dot(R,EV),0.0),Mi))*Fw;gl_FragColor+=(Md*Td)*((Lc[i]*Li[i])*Dw);gl_FragColor.a=Td.a*Mo;gl_FragColor+=(Ms*texture2D(Ss,Vu))*((Lc[i]*Li[i])*Sw);}}if(Fd>0.0){Fz=gl_FragCoord.z/gl_FragCoord.w;Ff=clamp(exp2(-Fd*Fd*Fz*Fz*1.442695),0.0,1.0);gl_FragColor=mix(Fc,gl_FragColor,Ff);}}';


/** 
 * OvoiD.JS Library version.
 * @constant
 * @memberOf _global_
 */
Ovoid.OVOIDJS_VERSION = '1.1';


/** OvoiD.JS Library first-build date.
 * @constant
 * @memberOf _global_
 */
Ovoid.OVOIDJS_FIRSTBUILD_DATE = '16-07-2012';

/** OvoiD.JS Library release date.
 * @constant
 * @memberOf _global_
 */
Ovoid.OVOIDJS_RELEASE_DATE = 'XX-XX-2012';
