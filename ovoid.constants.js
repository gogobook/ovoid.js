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
Ovoid.MAX_JOINT_BY_SKIN = 32;


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


/** Sleeping motion epsilon limit for rigid bodys 
 * @constant 
 * @memberOf _global_
 * @see Ovoid.Physics */
Ovoid.PHYSICS_MOTION_EPSILON = 0.1;


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


/** Symbolic constant for shader's slot. Keep in stock.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Drawer
 */
Ovoid.DRAWER_SP_STOCK = -1;


/** Symbolic constant for shader's slot. Flat color drawing.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Drawer
 */
Ovoid.DRAWER_SP_COLOR = 2;


/** Symbolic constant for shader's slot. Vertex flat color drawing.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Drawer
 */
Ovoid.DRAWER_SP_VERTEX_COLOR = 3;


/** Symbolic constant for shader's slot. One light shading drawing.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Drawer
 */
Ovoid.DRAWER_SP_1LIGHT = 4;


/** Symbolic constant for shader's slot. N light(s) shading drawing.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Drawer
 */
Ovoid.DRAWER_SP_NLIGHT = 5;


/** Symbolic constant for shader's slot. Text layer drawing.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Drawer
 */
Ovoid.DRAWER_SP_TEXT = 6;


/** Symbolic constant for shader's slot. Text drawing.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Drawer
 */
Ovoid.DRAWER_SP_LAYER = 7;


/** Symbolic constant for shader's slot. Layer drawing.
 * @constant
 * @memberOf _global_
 * @see Ovoid.Drawer
 */
Ovoid.DRAWER_SP_PARTICLES = 8;


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


/** Default GLSL text vertex shader string for Text dedicated pipeline.
 * @constant
 * @memberOf _global_ */
Ovoid.DEFAULT_GLSL_TEXT_VS = "attribute vec4 	p;uniform mat4 MXF;uniform mat4 MEV;varying float a;void main(void) {a=p.w;gl_PointSize=p.z;gl_Position=MEV*MXF*vec4(p.xy,0.0,1.0);}";

/** Default GLSL text fragment shader string for Text dedicated pipeline.
 * @constant
 * @memberOf _global_ */
Ovoid.DEFAULT_GLSL_TEXT_FS = "precision highp float; uniform vec4 C; uniform sampler2D Sd; varying float a; vec2 Gu; void main(void) {Gu.s=(gl_PointCoord.s*0.0625)+(floor(mod(a,16.0))*0.0625);Gu.t=(1.0-(gl_PointCoord.t*0.0625))-(floor(a/16.0)*0.0625);gl_FragColor=texture2D(Sd,Gu)*C;}";


/** Default GLSL layer vertex shader string for Layer dedicated pipeline.
 * @constant
 * @memberOf _global_ */
//Ovoid.DEFAULT_GLSL_LAYER_VS = "attribute vec4 p; attribute vec3 u;uniform vec3 Ls; uniform mat4 MXF; uniform mat4 MEV; varying vec2 Vu; vec4 Vp; void main(void){Vp=p;Vp.x*=Ls.x;Vp.y*=Ls.y;Vu=u.xy;gl_Position=MEV*MXF*Vp;}";
Ovoid.DEFAULT_GLSL_LAYER_VS = "attribute vec4 p; attribute vec3 u;uniform mat4 MXF; uniform mat4 MEV; varying vec2 Vu; vec4 Vp; void main(void){Vp=p;Vu=u.xy;gl_Position=MEV*MXF*Vp;}";


/** Default GLSL layer fragment shader string for Layer dedicated pipeline.
 * @constant
 * @memberOf _global_ */
Ovoid.DEFAULT_GLSL_LAYER_FS = 'precision highp float;uniform vec4 C;uniform vec3 Es;uniform sampler2D Sd;varying vec2 Vu;void main(void){gl_FragColor=texture2D(Sd,Vu)*C;}';


/** Default GLSL particle vertex shader string for particle pipeline.
 * @constant
 * @memberOf _global_ */
Ovoid.DEFAULT_GLSL_PARTICLE_VS = 'attribute vec4 p;attribute vec3 u;attribute vec4 c;uniform mat4 MEV;uniform vec4 Ep;uniform mat4 MXF;varying vec4 Vp;varying vec2 Vu;varying vec4 Vc;float d;void main(void) {Vp = p;d = distance(p, Ep);Vu = u.xy;Vc = c;gl_PointSize = ((u.z * 10.0) / d);gl_Position = MEV * Vp;}'


/** Default GLSL particle fragment shader string for particle pipeline.
 * @constant
 * @memberOf _global_ */
Ovoid.DEFAULT_GLSL_PARTICLE_FS = 'precision highp float;uniform vec4 C;uniform sampler2D Sd;varying vec4 Vp;varying vec2 Vu;varying vec4 Vc;void main(void) {gl_FragColor=texture2D(Sd,gl_PointCoord)*Vc;}';


/** Default GLSL versatil vertex shader string for drawing pipeline.
 * @constant
 * @memberOf _global_ */
Ovoid.DEFAULT_GLSL_PNUTBCIW_VS = '#define MATRIX_ARRAY_SIZE '+Ovoid.MAX_JOINT_BY_SKIN+'\nattribute vec4 p;attribute vec3 n;attribute vec3 u;attribute vec3 t;attribute vec3 b;attribute vec4 c;attribute vec4 i;attribute vec4 w;uniform bool ENw;uniform bool ENt;uniform mat4 MEV;uniform mat4 MXF[MATRIX_ARRAY_SIZE];uniform mat3 MNR[MATRIX_ARRAY_SIZE];varying vec4 Vp;varying vec3 Vn;varying vec2 Vu;varying vec3 Vt;varying vec3 Vb;varying vec4 Vc;void main(void){if(ENw){Vp=vec4(0.0,0.0,0.0,0.0);Vn=vec3(0.0,0.0,0.0);Vp+=(MXF[int(i.x)]*p)*w.x;Vn+=(MNR[int(i.x)]*n)*w.x;Vp+=(MXF[int(i.y)]*p)*w.y;Vn+=(MNR[int(i.y)]*n)*w.y;Vp+=(MXF[int(i.z)]*p)*w.z;Vn+=(MNR[int(i.z)]*n)*w.z;Vp+=(MXF[int(i.w)]*p)*w.w;Vn+=(MNR[int(i.w)]*n)*w.w;}else{Vp=MXF[0]*p;Vn=MNR[0]*n;}if(ENt){vec3 Cz=cross(Vn,vec3(0.0,0.0,1.0));vec3 Cy=cross(Vn,vec3(0.0,1.0,0.0));if(length(Cz)>length(Cy)){Vt=Cz;}else{Vt=Cy;}Vb=cross(Vn,Vt);}else{Vt=t;Vb=b;}Vu=u.xy;Vc=c;gl_PointSize=u.z;gl_Position=MEV*Vp;}';


/** Default GLSL vertex shader string for hybrid PNU/PNUIW.
 * @constant
 * @memberOf _global_ */
Ovoid.DEFAULT_GLSL_PNUIW_HYBRID_VS = '#define MA '+Ovoid.MAX_JOINT_BY_SKIN+'\nattribute vec4 p;attribute vec3 n;attribute vec3 u;attribute vec4 i;attribute vec4 w;uniform bool ENw;uniform mat4 MEV;uniform mat4 MXF[MA];uniform mat3 MNR[MA];varying vec4 Vp;varying vec3 Vn;varying vec2 Vu;void main(void){if(ENw){Vp=vec4(0.0,0.0,0.0,0.0);Vn=vec3(0.0,0.0,0.0);Vp+=(MXF[int(i.x)]*p)*w.x;Vn+=(MNR[int(i.x)]*n)*w.x;Vp+=(MXF[int(i.y)]*p)*w.y;Vn+=(MNR[int(i.y)]*n)*w.y;Vp+=(MXF[int(i.z)]*p)*w.z;Vn+=(MNR[int(i.z)]*n)*w.z;Vp+=(MXF[int(i.w)]*p)*w.w;Vn+=(MNR[int(i.w)]*n)*w.w;}else{Vp=MXF[0]*p;Vn=MNR[0]*n;}Vu=u.xy;gl_Position=MEV*Vp;}'


/** Default GLSL P vertex shader string for Position.
 * @constant
 * @memberOf _global_ */
Ovoid.DEFAULT_GLSL_P_VS = 'attribute vec4 p;uniform mat4 MEV;uniform mat4 MXF;void main(void){gl_Position=MEV*(MXF*p);}';


/** Default GLSL vertex shader string for Position, Color.
 * @constant
 * @memberOf _global_ */
Ovoid.DEFAULT_GLSL_PC_VS = 'attribute vec4 p;attribute vec4 c;uniform mat4 MEV;uniform mat4 MXF;varying vec4 Vc;void main(void){Vc=c;gl_Position=MEV*(MXF*p);}';



/** Default GLSL vertex shader string for Position, Normal, Uv.
 * @constant
 * @memberOf _global_ */
Ovoid.DEFAULT_GLSL_PNU_VS = 'attribute vec4 p;attribute vec3 n;attribute vec3 u;uniform mat4 MEV;uniform mat4 MXF;uniform mat3 MNR;varying vec4 Vp;varying vec3 Vn;varying vec2 Vu;void main(void){Vp=MXF*p;Vn=MNR*n;Vu=u.xy;gl_Position=MEV*Vp;}';



/** Default GLSL vertex shader string for Position, Normal, Uv, Influence, Weight.
 * @constant
 * @memberOf _global_ */
Ovoid.DEFAULT_GLSL_PNUIW_VS = '#define MA '+Ovoid.MAX_JOINT_BY_SKIN+'\nattribute vec4 p;attribute vec3 n;attribute vec3 u;attribute vec4 i;attribute vec4 w;uniform mat4 MEV;uniform mat4 MXF[MA];uniform mat3 MNR[MA];varying vec4 Vp;varying vec3 Vn;varying vec2 Vu;void main(void){Vp=vec4(0.0,0.0,0.0,0.0);Vn=vec3(0.0,0.0,0.0);Vp+=(MXF[int(i.x)]*p)*w.x;Vn+=(MNR[int(i.x)]*n)*w.x;Vp+=(MXF[int(i.y)]*p)*w.y;Vn+=(MNR[int(i.y)]*n)*w.y;Vp+=(MXF[int(i.z)]*p)*w.z;Vn+=(MNR[int(i.z)]*n)*w.z;Vp+=(MXF[int(i.w)]*p)*w.w;Vn+=(MNR[int(i.w)]*n)*w.w;Vu=u.xy;gl_Position=MEV*Vp;}';



/** Default GLSL fragment shader string for readPixel picking pipeline.
 * @constant
 * @memberOf _global_ */
Ovoid.DEFAULT_GLSL_FCOLOR_FS = 'precision highp float;uniform vec4 C;void main(void){gl_FragColor=C;}';



/** Default GLSL fragment shader string for Symbolic shapes pipeline.
 * @constant
 * @memberOf _global_ */
Ovoid.DEFAULT_GLSL_VCOLOR_FS = 'precision highp float;uniform vec4 C;varying vec4 Vc;void main(void){gl_FragColor=Vc*C;}';


/** Default GLSL fragment shader string for N-lights pass pipeline.
 * @constant
 * @memberOf _global_ */
Ovoid.DEFAULT_GLSL_AERDS_NL_FS = '#define ML '+Ovoid.MAX_LIGHT_BY_DRAW+'\nprecision highp float;uniform bool ENa;uniform bool ENd;uniform vec4 Ep;uniform vec4 Ac;uniform vec4 Lp[ML];uniform vec3 Ld[ML];uniform vec4 Lc[ML];uniform float Li[ML];uniform float Lr[ML];uniform float Lf[ML];uniform float La[ML];uniform bool Le[ML];uniform vec4 Md;uniform vec4 Ma;uniform vec4 Ms;uniform vec4 Me;uniform vec4 Mr;uniform float Mi;uniform float My;uniform float Mo;uniform sampler2D Sd;uniform sampler2D Ss;uniform sampler2D Se;uniform sampler2D Sr;varying vec4 Vp;varying vec3 Vn;varying vec2 Vu;float Fw,Dw,Sw;vec3 EV,R,LV;vec2 Ru;void main(void){EV=normalize(Ep-Vp).xyz;if(ENa){gl_FragColor=(Ma*Md*texture2D(Sd,Vu))*Ac;gl_FragColor+=(Me*texture2D(Se,Vu));R=normalize(reflect(EV,Vn));Ru=(R.xy/(2.0*(1.0+abs(R.z))))+0.5;gl_FragColor+=(Mr*texture2D(Sr,Ru))*My;}if(ENd){for(int i=0;i<ML;i++){if(Le[i]==false)continue;LV=normalize(Lp[i]-Vp).xyz;Fw=clamp((-dot(LV,Ld[i])-(cos(La[i])))/(Lf[i]),0.0,1.0);Dw=max(dot(Vn,LV),0.0)*Li[i]*Fw;R=normalize(reflect(-LV,Vn));Sw=(pow(max(dot(R,EV),0.0),Mi))*Fw;gl_FragColor+=(Md*texture2D(Sd,Vu))*((Lc[i]*Li[i])*Dw);gl_FragColor+=(Ms*texture2D(Ss,Vu))*((Lc[i]*Li[i])*Sw);}}gl_FragColor.a=Mo;}';


/** Default GLSL fragment shader string per-light pass pipeline.
 * @constant
 * @memberOf _global_ */
Ovoid.DEFAULT_GLSL_AERDS_1L_FS = 'precision highp float;uniform bool ENa;uniform bool ENd;uniform vec4 Ep;uniform vec4 Ac;uniform vec4 Lp;uniform vec3 Ld;uniform vec4 Lc;uniform float Li;uniform float Lr;uniform float Lf;uniform float La;uniform vec4 Md;uniform vec4 Ma;uniform vec4 Ms;uniform vec4 Me;uniform vec4 Mr;uniform float Mi;uniform float My;uniform float Mo;uniform sampler2D Sd;uniform sampler2D Ss;uniform sampler2D Se;uniform sampler2D Sr;varying vec4 Vp;varying vec3 Vn;varying vec2 Vu;float Fw,Dw,Sw;vec3 EV,R,LV;vec2 Ru;void main(void){EV=normalize(Ep-Vp).xyz;if(ENa){gl_FragColor=(Ma*Md*texture2D(Sd,Vu))*Ac;gl_FragColor+=(Me*texture2D(Se,Vu));R=normalize(reflect(EV,Vn));Ru=(R.xy/(2.0*(1.0+abs(R.z))))+0.5;gl_FragColor+=(Mr*texture2D(Sr,Ru))*My;}if(ENd){LV=normalize(Lp-Vp).xyz;Fw=clamp((-dot(LV,Ld)-(cos(La)))/(Lf),0.0,1.0);Dw=max(dot(Vn,LV),0.0)*Li*Fw;R=normalize(reflect(-LV,Vn));Sw=(pow(max(dot(R,EV),0.0),Mi))*Fw;gl_FragColor+=(Md*texture2D(Sd,Vu))*((Lc*Li)*Dw);gl_FragColor+=(Ms*texture2D(Ss,Vu))*((Lc*Li)*Sw);}gl_FragColor.a=Mo;}';


/** Default GLSL fragment shader string for Z-Fail shadow casting pipeline.
 * @constant
 * @memberOf _global_ */
Ovoid.DEFAULT_GLSL_S1LIGHT_FS = 'precision highp float;uniform bool ENa;uniform bool ENd;uniform vec4 Ep;uniform vec4 Ac;uniform vec4 Lp;uniform vec3 Ld;uniform vec4 Lc;uniform float Li;uniform float Lr;uniform float Lf;uniform float La;uniform bool Le;uniform vec4 Md;uniform vec4 Ma;uniform vec4 Ms;uniform vec4 Me;uniform vec4 Mr;uniform float Mi;uniform float My;uniform float Mo;uniform sampler2D Sa;uniform sampler2D Sd;uniform sampler2D Ss;uniform sampler2D Se;uniform sampler2D Sr;uniform sampler2D Sn;varying vec4 Vp;varying vec3 Vn;varying vec2 Vu;varying vec4 Vc;float Fw,Dw,Sw;vec3 EV,R,LV;vec2 Ru;void main(void){gl_FragColor+=Vc;EV=normalize(Ep-Vp).xyz;if(ENa){gl_FragColor+=(Md * texture2D(Sd, Vu))*Ac;gl_FragColor+=(Ma*texture2D(Sa,Vu));gl_FragColor+=(Me*texture2D(Se,Vu));R=reflect(EV,Vn);R=normalize(R);Ru=(R.xy/(2.0*(1.0+abs(R.z))))+0.5;gl_FragColor+=(Mr*texture2D(Sr,Ru))*My;} if(ENd){LV=normalize(Lp-Vp).xyz;Fw=clamp((-dot(LV,Ld)-(cos(La)))/(Lf),0.0,1.0);Dw=max(dot(Vn,LV),0.0)*Li*Fw;gl_FragColor+=(Md*texture2D(Sd,Vu))*((Lc*Li)*Dw);R=-reflect(LV,Vn);R=normalize(R);Sw=(pow(max(dot(R,EV),0.0),Mi))*Fw;gl_FragColor+=(Ms*texture2D(Ss,Vu))*((Lc*Li)*Sw);}gl_FragColor.a=Mo;}';


/** Default GLSL fragment shader string for Standard shading pipeline.
 * @constant
 * @memberOf _global_ */
Ovoid.DEFAULT_GLSL_SNLIGHT_FS ='#define MAX_LIGHT_COUNT '+Ovoid.MAX_LIGHT_BY_DRAW+'\nprecision highp float;uniform bool ENa;uniform bool ENd;uniform vec4 Ep;uniform vec4 Ac;uniform vec4 Lp[MAX_LIGHT_COUNT];uniform vec3 Ld[MAX_LIGHT_COUNT];uniform vec4 Lc[MAX_LIGHT_COUNT];uniform float Li[MAX_LIGHT_COUNT];uniform float Lr[MAX_LIGHT_COUNT];uniform float Lf[MAX_LIGHT_COUNT];uniform float La[MAX_LIGHT_COUNT];uniform bool Le[MAX_LIGHT_COUNT];uniform vec4 Md;uniform vec4 Ma;uniform vec4 Ms;uniform vec4 Me;uniform vec4 Mr;uniform float Mi;uniform float My;uniform float Mo;uniform sampler2D Sa;uniform sampler2D Sd;uniform sampler2D Ss;uniform sampler2D Se;uniform sampler2D Sr;uniform sampler2D Sn;varying vec4 Vp;varying vec3 Vn;varying vec2 Vu;varying vec4 Vc;float Fw,Dw,Sw;vec3 EV,R,LV;vec2 Ru;void main(void){gl_FragColor+=Vc;EV=normalize(Ep-Vp).xyz;if(ENa){gl_FragColor+=(Md*texture2D(Sd,Vu))*Ac;gl_FragColor+=(Ma*texture2D(Sa,Vu));gl_FragColor+=(Me*texture2D(Se,Vu));R=reflect(EV,Vn);R=normalize(R);Ru=(R.xy/(2.0*(1.0+abs(R.z))))+0.5;gl_FragColor+=(Mr*texture2D(Sr,Ru))*My;}if(ENd){for(int i=0;i<MAX_LIGHT_COUNT;i++){if(!Le[i])continue;LV=normalize(Lp[i]-Vp).xyz;Fw=clamp((-dot(LV,Ld[i])-(cos(La[i])))/(Lf[i]),0.0,1.0);Dw=max(dot(Vn,LV),0.0)*Li[i]*Fw;gl_FragColor+=(Md*texture2D(Sd,Vu))*((Lc[i]*Li[i])*Dw);R=-reflect(LV,Vn);R=normalize(R);Sw=(pow(max(dot(R,EV),0.0),Mi))*Fw;gl_FragColor+=(Ms*texture2D(Ss,Vu))*((Lc[i]*Li[i])*Sw);}}gl_FragColor.a=Mo;}';


Ovoid.DEFAULT_GLSL_BASIC_Nl_FS = '#define LC '+Ovoid.MAX_LIGHT_BY_DRAW+'\nprecision highp float;uniform vec4 Ep;uniform vec4 Ac;uniform vec4 Lp[LC];uniform vec3 Ld[LC];uniform vec4 Lc[LC];uniform float Li[LC];uniform float Lr[LC];uniform float Lf[LC];uniform float La[LC];uniform bool Le[LC];uniform vec4 Md;uniform vec4 Ma;uniform vec4 Ms;uniform vec4 Me;uniform vec4 Mr;uniform float Mi;uniform float My;uniform float Mo;uniform sampler2D Sd;uniform sampler2D Sr;varying vec4 Vp;varying vec3 Vn;varying vec2 Vu;float Fw,Dw,Sw;vec3 EV,R,LV;vec2 Ru;void main(void){EV=normalize(Ep-Vp).xyz;gl_FragColor=Md*Ac;gl_FragColor+=Me;for(int i=0;i<LC;i++){LV=normalize(Lp[i]-Vp).xyz;Fw=clamp((-dot(LV,Ld[i])-(cos(La[i])))/(Lf[i]),0.0,1.0);Dw=max(dot(Vn,LV),0.0)*Li[i]*Fw;gl_FragColor+=(Md*texture2D(Sd,Vu))*((Lc[i]*Li[i])*Dw);R=normalize(reflect(-LV,Vn));Sw=(pow(max(dot(R,EV),0.0),Mi))*Fw;gl_FragColor+=Ms*Sw;}gl_FragColor.a=Mo;}';


/** Default GLSL Wrap map Json string for drawer basic init.
 * @constant
 * @memberOf _global_ */
Ovoid.DEFAULT_GLSL_WRAPMAP = '{"OJSON":1,"type":"glslmap","wrapmap": {"attribute":[{"id":1,"name":"p"},{"id":2,"name":"n"},{"id":4,"name":"u"},{"id":8,"name":"t"},{"id":16,"name":"b"},{"id":32,"name":"c"},{"id":64,"name":"i"},{"id":128,"name":"w"}],"uniform":[{"id":0,"name":"ENd"},{"id":1,"name":"ENa"},{"id":2,"name":"ENs"},{"id":3,"name":"ENr"},{"id":4,"name":"ENp"},{"id":5,"name":"ENm"},{"id":6,"name":"ENw"},{"id":7,"name":"ENt"},{"id":8,"name":"Z"},{"id":9,"name":"C"},{"id":10,"name":"Ma"},{"id":11,"name":"Md"},{"id":12,"name":"Ms"},{"id":13,"name":"Me"},{"id":14,"name":"Mr"},{"id":15,"name":"Mi"},{"id":16,"name":"Mo"},{"id":17,"name":"My"},{"id":18,"name":"Mb"},{"id":19,"name":"Lw"},{"id":20,"name":"Lp"},{"id":21,"name":"Ld"},{"id":22,"name":"Lc"},{"id":23,"name":"Li"},{"id":23,"name":"Lac"},{"id":24,"name":"Lr"},{"id":25,"name":"Lf"},{"id":26,"name":"La"},{"id":27,"name":"Lal"},{"id":28,"name":"Le"},{"id":29,"name":"Laq"},{"id":30,"name":"Ep"},{"id":31,"name":"Ed"},{"id":32,"name":"Es"},{"id":40,"name":"Ac"},{"id":42,"name":"Ls"}],"uniformMatrix":[{"id":0,"name":"MXF"},{"id":1,"name":"MNR"},{"id":2,"name":"MMV"},{"id":3,"name":"MEV"},{"id":4,"name":"MPJ"},{"id":5,"name":"MLA"},{"id":6,"name":"MJT"}],"uniformSampler":[{"id":1,"name":"Sd"},{"id":0,"name":"Sa"},{"id":1,"name":"Sd"},{"id":2,"name":"Ss"},{"id":3,"name":"Se"},{"id":4,"name":"Sr"},{"id":5,"name":"Sn"}]}}';


/** 
 * OvoiD.JS Library version.
 * @constant
 * @memberOf _global_
 */
Ovoid.OVOI3D_VERSION = '1.1';


/** OvoiD.JS Library first-build date.
 * @constant
 * @memberOf _global_
 */
Ovoid.OVOI3D_FIRSTBUILD_DATE = '16-07-2012';

/** OvoiD.JS Library release date.
 * @constant
 * @memberOf _global_
 */
Ovoid.OVOI3D_RELEASE_DATE = 'XX-XX-2012';
