---
title: Lemma 1 的 Schur-Weyl / Cauchy 分解证明笔记
---


## 0. 目标公式

令

$$  
M:=M_2,\qquad V:=V_2,\qquad \dim M=c_N,\qquad \dim V=2.  
$$

取

$$  
|\xi_R\rangle\in M\otimes V  
$$

为 (R) 的 purification。选择一个线性映射

$$  
A:V\to M  
$$

使得

$$  
|\xi_R\rangle=\operatorname{vec}(A),  
\qquad  
A^\dagger A=R.  
$$

这里使用物理中的 vectorization convention；严格数学上可以把第二个因子写成 (V^_)，但选定正交归一基后可把 (V^_\cong V)。

定义

# $$  
\Omega_n[R]

\mathbb E_{U\sim \mathrm{Haar}(U(M))}  
\left[  
\bigl((U\otimes I_V)|\xi_R\rangle\langle\xi_R|  
(U^\dagger\otimes I_V)\bigr)^{\otimes n}  
\right].  
$$

Cauchy decomposition 给出

$$  
\mathrm{Sym}^n(M\otimes V)  
\cong  
\bigoplus_{\lambda\vdash n}  
S_\lambda(M)\otimes S_\lambda(V),  
$$

其中只保留满足

$$  
\ell(\lambda)\leq \min(\dim M,\dim V)  
$$

的 Young diagrams。因为这里 (\dim V=2)，所以只会出现至多两行的 (\lambda)。

Lemma 1 要证明的是固定 (\lambda) block 上有

# $$  
\boxed{  
\Omega_{n,\lambda}[R]

\frac{f^\lambda}{d_\lambda(c_N)}  
I_{S_\lambda(M)}  
\otimes  
S_\lambda(R).  
}  
$$

其中

$$  
f^\lambda=\dim[\lambda],  
\qquad  
d_\lambda(c_N)=\dim S_\lambda(M).  
$$

这里 ([\lambda]) 是 symmetric group (S_n) 的 Specht module，(S_\lambda(M)) 是 (U(M)) 的 Schur functor representation space。

---

## 1. 为什么 ($A^{\otimes n}$) 分解成 ($S_\lambda(A)\otimes I_{[\lambda]}$)？

因为

$$  
A^{\otimes n}:V^{\otimes n}\to M^{\otimes n}  
$$

与 replica permutation 作用相容。

对任意 (\pi\in S_n)，令 (P_V(\pi)) 是在 (V^{\otimes n}) 上 permute tensor factors 的作用，(P_M(\pi)) 是在 (M^{\otimes n}) 上的对应作用，则

# $$  
P_M(\pi)A^{\otimes n}

A^{\otimes n}P_V(\pi).  
$$

严格地说，这不是普通意义上的 commute，因为左右作用在不同空间上。更准确地说：

$$  
A^{\otimes n}  
$$

是一个 (S_n)-intertwiner。

Schur-Weyl decomposition 是

$$  
M^{\otimes n}  
\cong  
\bigoplus_{\lambda\vdash n}  
S_\lambda(M)\otimes[\lambda],  
$$

$$  
V^{\otimes n}  
\cong  
\bigoplus_{\lambda\vdash n}  
S_\lambda(V)\otimes[\lambda].  
$$

因为 (A^{\otimes n}) 是 (S_n)-intertwiner，它不能把 ([\lambda]) sector 映到 ([\mu]) sector，除非 (\lambda=\mu)。并且在 Specht factor ([\lambda]) 上，它只能是 identity。真正的非平凡作用发生在 Schur functor space 上：

$$  
S_\lambda(A):S_\lambda(V)\to S_\lambda(M).  
$$

因此

$$  
\boxed{  
A^{\otimes n}  
\cong  
\bigoplus_{\lambda\vdash n}  
S_\lambda(A)\otimes I_{[\lambda]}.  
}  
$$

这一步是 Schur-Weyl 分解下的 functoriality。

---

## 2. Cauchy decomposition 里被“吸收”的 Specht direction 是什么？

因为

$$  
|\xi_R\rangle=\operatorname{vec}(A),  
$$

所以

# $$  
|\xi_R\rangle^{\otimes n}

\operatorname{vec}(A^{\otimes n}).  
$$

在 Schur-Weyl 的 (\lambda) block 中，

$$  
A^{\otimes n}  
\sim  
S_\lambda(A)\otimes I_{[\lambda]}.  
$$

于是

# $$  
\operatorname{vec}(A^{\otimes n})_\lambda

\operatorname{vec}\bigl(S_\lambda(A)\otimes I_{[\lambda]}\bigr).  
$$

利用

# $$  
\operatorname{vec}(B\otimes C)

\operatorname{vec}(B)\otimes\operatorname{vec}(C),  
$$

得到

# $$  
\operatorname{vec}(A^{\otimes n})_\lambda

\operatorname{vec}(S_\lambda(A))  
\otimes  
\operatorname{vec}(I_{[\lambda]}).  
$$

现在解释 (\operatorname{vec}(I_{[\lambda]}))。

令

$$  
W=[\lambda],  
\qquad  
\dim W=f^\lambda.  
$$

取 (W) 的正交归一基

$$  
{e_a}_{a=1}^{f^\lambda}.  
$$

则

# $$  
I_W

\sum_{a=1}^{f^\lambda}  
|e_a\rangle\langle e_a|.  
$$

vectorization 后，

# $$  
\operatorname{vec}(I_W)

\sum_{a=1}^{f^\lambda}  
e_a\otimes e_a^*  
\in W\otimes W^*.  
$$

它的 norm square 是

# $$  
\left|\operatorname{vec}(I_W)\right|^2

# \operatorname{Tr}(I_W^\dagger I_W)

# \operatorname{Tr}I_W

f^\lambda.  
$$

因此归一化 invariant vector 是

# $$  
|\Phi_\lambda\rangle

# \frac{1}{\sqrt{f^\lambda}}  
\operatorname{vec}(I_{[\lambda]})

\frac{1}{\sqrt{f^\lambda}}  
\sum_{a=1}^{f^\lambda}  
e_a\otimes e_a^*.  
$$

所以

# $$  
\operatorname{vec}(I_{[\lambda]})

\sqrt{f^\lambda}  
|\Phi_\lambda\rangle.  
$$

---

## 3. 为什么 ([\lambda]) 和 ([\lambda]^*) 配对后留下 identity direction？

这是 Schur lemma 的直接结果。

有标准同构

$$  
[\lambda]\otimes[\lambda]^*  
\cong  
\operatorname{End}([\lambda]).  
$$

具体地，

$$  
w\otimes\varphi  
\quad\leftrightarrow\quad  
\bigl(x\mapsto \varphi(x)w\bigr).  
$$

在这个同构下，(S_n) 对

$$  
[\lambda]\otimes[\lambda]^*  
$$

的作用对应于 (\operatorname{End}([\lambda])) 上的 conjugation：

$$  
T  
\mapsto  
\rho_\lambda(\pi)T\rho_\lambda(\pi)^{-1}.  
$$

因此一个向量是 (S_n)-invariant，当且仅当对应的算符 (T) 满足

# $$  
\rho_\lambda(\pi)T

T\rho_\lambda(\pi)  
\qquad  
\forall \pi\in S_n.  
$$

也就是说

$$  
T\in \operatorname{Hom}_{S_n}([\lambda],[\lambda]).  
$$

因为 ([\lambda]) 是 irreducible representation，由 Schur lemma，

# $$  
\operatorname{Hom}_{S_n}([\lambda],[\lambda])

\mathbb C I_{[\lambda]}.  
$$

所以

# $$  
\boxed{  
\left([\lambda]\otimes[\lambda]^*\right)^{S_n}

\mathbb C,\operatorname{vec}(I_{[\lambda]}).  
}  
$$

如果 (\lambda\neq\mu)，则

$$  
\operatorname{Hom}_{S_n}([\mu],[\lambda])=0,  
$$

因此

$$  
\left([\lambda]\otimes[\mu]^*\right)^{S_n}=0.  
$$

这解释了为什么 Cauchy decomposition 中只有 (\lambda=\mu) 的项留下。

严格地说，Cauchy decomposition 可以先写成

$$  
\mathrm{Sym}^n(M\otimes V)  
\cong  
\bigoplus_\lambda  
S_\lambda(M)\otimes S_\lambda(V)  
\otimes  
\mathbb C|\Phi_\lambda\rangle.  
$$

因为最后一项是一维固定方向，通常省略它，写成

$$  
\boxed{  
\mathrm{Sym}^n(M\otimes V)  
\cong  
\bigoplus_\lambda  
S_\lambda(M)\otimes S_\lambda(V).  
}  
$$

所谓“吸收 Specht direction”就是指把

$$  
x\otimes y\otimes |\Phi_\lambda\rangle  
$$

识别为

$$  
x\otimes y.  
$$

但是注意：

$$  
\operatorname{vec}(I_{[\lambda]})  
$$

不是 normalized vector，而是

# $$  
\operatorname{vec}(I_{[\lambda]})

\sqrt{f^\lambda}  
|\Phi_\lambda\rangle.  
$$

所以在 Cauchy identification 后，

# $$  
\operatorname{vec}(A^{\otimes n})_\lambda

\sqrt{f^\lambda}  
\operatorname{vec}(S_\lambda(A)).  
$$

因此

# $$  
\boxed{  
|\xi_R\rangle_\lambda^{\otimes n}

\sqrt{f^\lambda}  
|\operatorname{vec}(S_\lambda(A))\rangle.  
}  
$$

于是 Haar averaging 之前的 rank-one operator 是

# $$  
\boxed{  
\left(|\xi_R\rangle\langle\xi_R|\right)_{\lambda}^{\otimes n}

f^\lambda  
|\operatorname{vec}(S_\lambda(A))\rangle  
\langle\operatorname{vec}(S_\lambda(A))|.  
}  
$$

这里的 (f^\lambda) 就是 Specht factor 的维数。

---

## 4. ((S_\lambda(U)\otimes I)|\operatorname{vec}(S_\lambda(A))\rangle) 是怎么作用的？

令

$$  
X=S_\lambda(M),  
\qquad  
Y=S_\lambda(V),  
$$

并设

$$  
B=S_\lambda(A):Y\to X.  
$$

于是

$$  
|\operatorname{vec}(B)\rangle\in X\otimes Y.  
$$

取 (X) 的正交归一基 ({|i\rangle})，(Y) 的正交归一基 ({|\alpha\rangle})。写

# $$  
B

\sum_{i,\alpha}  
B_{i\alpha}  
|i\rangle\langle\alpha|.  
$$

则

# $$  
|\operatorname{vec}(B)\rangle

\sum_{i,\alpha}  
B_{i\alpha}  
|i\rangle_X\otimes|\alpha\rangle_Y.  
$$

令

$$  
W=S_\lambda(U).  
$$

那么

# $$  
(W\otimes I_Y)|\operatorname{vec}(B)\rangle

\sum_{i,\alpha}  
B_{i\alpha}  
(W|i\rangle)\otimes|\alpha\rangle.  
$$

展开

# $$  
W|i\rangle

\sum_j W_{ji}|j\rangle,  
$$

得到

# $$  
(W\otimes I_Y)|\operatorname{vec}(B)\rangle

\sum_{j,\alpha}  
\left(\sum_i W_{ji}B_{i\alpha}\right)  
|j\rangle\otimes|\alpha\rangle.  
$$

括号中的系数就是矩阵乘积 (WB) 的矩阵元：

# $$  
(WB)_{j\alpha}

\sum_i W_{ji}B_{i\alpha}.  
$$

因此

# $$  
\boxed{  
(W\otimes I_Y)|\operatorname{vec}(B)\rangle

|\operatorname{vec}(WB)\rangle.  
}  
$$

代入

$$  
W=S_\lambda(U),  
\qquad  
B=S_\lambda(A),  
$$

得到

# $$  
\boxed{  
(S_\lambda(U)\otimes I)  
|\operatorname{vec}(S_\lambda(A))\rangle

|\operatorname{vec}(S_\lambda(U)S_\lambda(A))\rangle.  
}  
$$

又因为 Schur functor 是 functorial 的，

# $$  
S_\lambda(U)S_\lambda(A)

S_\lambda(UA).  
$$

所以也可以写成

# $$  
(S_\lambda(U)\otimes I)  
|\operatorname{vec}(S_\lambda(A))\rangle

|\operatorname{vec}(S_\lambda(UA))\rangle.  
$$

---

## 5. Bipartite Haar twirl 为什么给出 (I\otimes B^\dagger B)？

需要证明的基本公式是：

# $$  
\boxed{  
\int  
(W\otimes I_Y)  
|\operatorname{vec}(B)\rangle\langle\operatorname{vec}(B)|  
(W^\dagger\otimes I_Y)  
,dU

\frac{I_X}{D}\otimes B^\dagger B.  
}  
$$

其中

$$  
X=S_\lambda(M),  
\qquad  
Y=S_\lambda(V),  
\qquad  
W=S_\lambda(U),  
\qquad  
D=\dim X=d_\lambda(c_N).  
$$

证明如下。

记左边为 (T)：

# $$  
T

\int  
(W\otimes I_Y)  
|\operatorname{vec}(B)\rangle\langle\operatorname{vec}(B)|  
(W^\dagger\otimes I_Y)  
,dU.  
$$

由于 Haar measure 左右不变，(T) 对所有 (W_0=S_\lambda(U_0)) 满足

$$  
(W_0\otimes I_Y)T(W_0^\dagger\otimes I_Y)=T.  
$$

也就是说，(T) 在第一个 tensor factor 上与 (S_\lambda(U(M))) 的作用对易。

因为 (S_\lambda(M)) 是 (U(M)) 的 irreducible representation，由 Schur lemma，(T) 在 (X) factor 上只能是 identity：

# $$  
T

\frac{I_X}{D}\otimes C  
$$

for some operator (C) on (Y)。

为了确定 (C)，对 (X) 做 partial trace：

# $$  
\operatorname{Tr}_X T

C.  
$$

另一方面，partial trace 对第一个 factor 上的 unitary conjugation 不变，所以

# $$  
\operatorname{Tr}_X T

\operatorname{Tr}_X  
|\operatorname{vec}(B)\rangle\langle\operatorname{vec}(B)|.  
$$

vec 的标准性质给出

# $$  
\operatorname{Tr}_X  
|\operatorname{vec}(B)\rangle\langle\operatorname{vec}(B)|

B^\dagger B.  
$$

因此

$$  
C=B^\dagger B.  
$$

所以

# $$  
\boxed{  
T

\frac{I_X}{D}\otimes B^\dagger B.  
}  
$$

这就是所谓“等价地，对 bipartite operator 有……”的意思。它只是把普通 Schur lemma twirl

# $$  
\int W X W^\dagger,dU

\frac{\operatorname{Tr}X}{D}I_X  
$$

应用到 bipartite system 的第一个 tensor factor 上。

---

## 6. 代回 Lemma 1

现在取

$$  
B=S_\lambda(A),  
\qquad  
D=d_\lambda(c_N).  
$$

前面已经得到

# $$  
\left(|\xi_R\rangle\langle\xi_R|\right)_{\lambda}^{\otimes n}

f^\lambda  
|\operatorname{vec}(S_\lambda(A))\rangle  
\langle\operatorname{vec}(S_\lambda(A))|.  
$$

因此

$$  
\begin{aligned}  
\Omega_{n,\lambda}[R]  
&=  
f^\lambda  
\int  
(S_\lambda(U)\otimes I)  
|\operatorname{vec}(S_\lambda(A))\rangle  
\langle\operatorname{vec}(S_\lambda(A))|  
(S_\lambda(U)^\dagger\otimes I)  
,dU  
\[4pt]  
&=  
f^\lambda  
\frac{I_{S_\lambda(M)}}{d_\lambda(c_N)}  
\otimes  
S_\lambda(A)^\dagger S_\lambda(A).  
\end{aligned}  
$$

使用 Schur functor 对乘法和伴随的自然性：

# $$  
S_\lambda(A)^\dagger S_\lambda(A)

S_\lambda(A^\dagger A).  
$$

由于

$$  
A^\dagger A=R,  
$$

所以

# $$  
S_\lambda(A)^\dagger S_\lambda(A)

S_\lambda(R).  
$$

最终得到

# $$  
\boxed{  
\Omega_{n,\lambda}[R]

\frac{f^\lambda}{d_\lambda(c_N)}  
I_{S_\lambda(M)}  
\otimes  
S_\lambda(R).  
}  
$$

这就是 Lemma 1。

---

## 7. 证明中的关键点总结

整个证明只用了三个事实。

第一，(A^{\otimes n}) 是 (S_n)-intertwiner，所以在 Schur-Weyl decomposition 下

# $$  
A^{\otimes n}

\bigoplus_\lambda  
S_\lambda(A)\otimes I_{[\lambda]}.  
$$

第二，Cauchy decomposition 取的是 diagonal (S_n)-invariants，而

# $$  
\left([\lambda]\otimes[\mu]^*\right)^{S_n}

\begin{cases}  
\mathbb C,\operatorname{vec}(I_{[\lambda]}), & \lambda=\mu,\  
0, & \lambda\neq\mu.  
\end{cases}  
$$

其中

# $$  
\operatorname{vec}(I_{[\lambda]})

\sqrt{f^\lambda}|\Phi_\lambda\rangle.  
$$

所以 vector 级别出现

$$  
\sqrt{f^\lambda},  
$$

projector 级别出现

$$  
f^\lambda.  
$$

第三，Haar twirl 只发生在 (S_\lambda(M)) factor 上。由 Schur lemma，

# $$  
\int  
(S_\lambda(U)\otimes I)  
|\operatorname{vec}(B)\rangle\langle\operatorname{vec}(B)|  
(S_\lambda(U)^\dagger\otimes I)  
,dU

\frac{I_{S_\lambda(M)}}{d_\lambda(c_N)}  
\otimes B^\dagger B.  
$$

取

$$  
B=S_\lambda(A)  
$$

后得到

# $$  
B^\dagger B

# S_\lambda(A^\dagger A)

S_\lambda(R).  
$$

因此 Lemma 1 的最终形式是

# $$  
\boxed{  
\Omega_{n,\lambda}[R]

\frac{f^\lambda}{d_\lambda(c_N)}  
I_{S_\lambda(M)}  
\otimes  
S_\lambda(R).  
}  
$$

---

## 8. 为什么这里不需要 Weingarten？

如果用 Weingarten calculus，需要展开

$$  
\mathbb E_U  
U_{i_1a_1}\cdots U_{i_na_n}  
\overline{  
U_{j_1b_1}\cdots U_{j_nb_n}  
}  
$$

并得到一个关于 permutations (\sigma,\tau\in S_n) 的和。然后再用 Young projectors 把这个 permutation convolution operator 对角化。

但在这里，我们已经直接使用了 Schur-Weyl decomposition。Schur-Weyl decomposition 已经把 Haar twirl 的 irreducible blocks 找出来了。因此 Haar average 在每个 (S_\lambda(M)) block 上由 Schur lemma 直接给出

$$  
\frac{I_{S_\lambda(M)}}{d_\lambda(c_N)}.  
$$

所以 Weingarten 是坐标形式的证明，而 Schur-Weyl + Schur lemma 是更干净的 representation-theoretic proof。