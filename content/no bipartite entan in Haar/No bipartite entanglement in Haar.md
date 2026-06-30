# 三方 Haar 随机态中的纠缠结构：为什么有强量子相关却没有 AB EPR 对？

## 0. 一句话总结

三方 Haar 随机纯态

$$
|\psi\rangle_{ABC}
$$

中，若把系统切成

$$
A|BC,
$$

那么 \(A\) 与整个 \(BC\) 之间通常有接近最大纠缠，因此可以说 \(A\) 的纠缠 partner 存在于 \(BC\) 中。

但是这个 partner 通常不是局域地放在 \(B\) 里，而是被高度非局域地编码在整个 \(BC\) 中。因此，只拿到 \(B\)，即使 \(A\) 和 \(B\) 有很大的 mutual information 和 logarithmic negativity，也无法从 \(A,B\) 中蒸馏出干净的 EPR pair。

更准确地说：

$$
A \text{ 与 } B \text{ 有强量子相关}
$$

但

$$
A \text{ 与 } B \text{ 没有 EPR-like distillable bipartite entanglement}.
$$

所以讲座中所谓 “No bipartite entanglement” 最好理解成：

$$
\boxed{
\text{No LU/LO-distillable EPR-like bipartite entanglement between } A \text{ and } B.
}
$$

而不是：

$$
\rho_{AB} \text{ 完全没有任何量子相关}.
$$

---

# 1. 背景：两方 Haar 随机态

## 1.1 两方纯态的 Page 定理直觉

考虑两方纯态

$$
|\psi\rangle_{AB}.
$$

如果

$$
d_A \ll d_B,
$$

则 Haar 随机纯态的约化态

$$
\rho_A = \operatorname{Tr}_B |\psi\rangle\langle\psi|
$$

几乎是最大混合态：

$$
\rho_A \approx \frac{I_A}{d_A}.
$$

所以

$$
S(A) \approx \log d_A.
$$

如果 \(A\) 有 \(n_A\) 个 qubits，则

$$
d_A = 2^{n_A},
$$

因此

$$
S(A) \approx n_A.
$$

这说明：在两方纯态中，较小系统 \(A\) 几乎与 \(B\) 最大纠缠。

---

## 1.2 两方纯态中，纠缠熵等于可蒸馏 EPR 对数量

对两方纯态

$$
|\psi\rangle_{AB},
$$

可以做 Schmidt 分解：

$$
|\psi\rangle_{AB}
=
\sum_i \sqrt{\lambda_i} |i\rangle_A |i\rangle_B.
$$

纠缠熵为

$$
S(A)
=
-\sum_i \lambda_i \log \lambda_i.
$$

在 asymptotic limit，也就是有很多份相同态

$$
|\psi\rangle_{AB}^{\otimes N}
$$

时，可以通过 LOCC 将其蒸馏成大约

$$
N S(A)
$$

个 EPR pairs。

因此对两方纯态：

$$
E_D(|\psi\rangle_{AB}) = S(A).
$$

这里 \(E_D\) 是 distillable entanglement。

所以，对两方纯态来说，可以把纠缠熵理解成 EPR 对的数量。

---

# 2. 为什么三方情形不同？

## 2.1 三方纯态中，\(\rho_{AB}\) 是混态

考虑三方纯态

$$
|\psi\rangle_{ABC}.
$$

整体 \(ABC\) 是纯态，但如果只看 \(A\) 与 \(B\)，则得到混态

$$
\rho_{AB}
=
\operatorname{Tr}_C |\psi\rangle\langle\psi|.
$$

因此，不能再用两方纯态的结论。

特别是：

$$
S(A)
$$

衡量的是

$$
A \text{ 与 } BC
$$

之间的纠缠，而不是

$$
A \text{ 与 } B
$$

之间的纠缠。

所以：

$$
S(A) \approx n_A
$$

只能说明

$$
A \text{ 与 } BC \text{ 之间有接近 } n_A \text{ 个 EPR 的纠缠量}.
$$

它不说明

$$
A \text{ 与 } B \text{ 之间有 } n_A \text{ 个 EPR 对}.
$$

---

## 2.2 \(A\) 的 Schmidt partner 在整个 \(BC\) 中

把三方态看成二分态：

$$
A|BC.
$$

Schmidt 分解为：

$$
|\psi\rangle_{ABC}
=
\sum_{i=1}^{d_A}
\sqrt{\lambda_i}
|i\rangle_A |\phi_i\rangle_{BC}.
$$

对 Haar 随机态，典型地

$$
\lambda_i \approx \frac{1}{d_A}.
$$

所以

$$
|\psi\rangle_{ABC}
\approx
\frac{1}{\sqrt{d_A}}
\sum_{i=1}^{d_A}
|i\rangle_A |\phi_i\rangle_{BC}.
$$

由于 \(\{|\phi_i\rangle_{BC}\}\) 是 \(BC\) 中的一组近似正交态，存在某个作用在整个 \(BC\) 上的整体幺正

$$
V_{BC}
$$

使得

$$
V_{BC}|\phi_i\rangle_{BC}
=
|i\rangle_R |\mathrm{junk}\rangle.
$$

于是

$$
(I_A \otimes V_{BC})|\psi\rangle_{ABC}
\approx
|\Phi\rangle_{AR}
\otimes
|\mathrm{junk}\rangle.
$$

这里

$$
|\Phi\rangle_{AR}
=
\frac{1}{\sqrt{d_A}}
\sum_i |i\rangle_A |i\rangle_R
$$

是一个最大纠缠态。

因此可以说：

$$
A \text{ 与 } BC \text{ 之间有 EPR-like entanglement}.
$$

但是这个 \(R\) 一般不是 \(B\) 中的一个局域子系统，而是非局域地编码在整个 \(BC\) 中。

---

# 3. 核心困惑：\(A\) 与 \(B\) 到底有没有纠缠？

## 3.1 需要区分四个层级

对 \(\rho_{AB}\)，有几种不同强度的概念：

### 第一层：相关性

如果

$$
I(A:B)>0,
$$

则说明 \(A\) 和 \(B\) 有总相关性，包括经典相关和量子相关。

mutual information 定义为：

$$
I(A:B)=S(A)+S(B)-S(AB).
$$

---

### 第二层：量子相关 / 非经典相关

例如 logarithmic negativity：

$$
E_N(A:B)
=
\log ||\rho_{AB}^{T_B}||_1.
$$

若

$$
E_N(A:B)>0,
$$

则说明 \(\rho_{AB}\) 有非经典特征，通常表示它不是普通的经典相关态。

讲座中强调，在三方 Haar 随机态里，\(A\) 和 \(B\) 可以有很大的 logarithmic negativity。

---

### 第三层：严格意义上的 entanglement / nonseparability

\(\rho_{AB}\) 若不能写成

$$
\rho_{AB}
=
\sum_x p_x \rho_A^{(x)}\otimes \rho_B^{(x)},
$$

则称为 entangled。

若能写成上述形式，则为 separable state。

---

### 第四层：distillable entanglement / EPR-like entanglement

如果存在 LOCC 或某种局域操作，使得

$$
\rho_{AB}^{\otimes N}
\longrightarrow
|\Phi^+\rangle^{\otimes k},
$$

且

$$
\frac{k}{N}>0,
$$

则说 \(\rho_{AB}\) 有可蒸馏纠缠。

EPR 对为：

$$
|\Phi^+\rangle_{AB}
=
\frac{|00\rangle+|11\rangle}{\sqrt{2}}.
$$

---

## 3.2 层级关系

大致关系是：

$$
\text{EPR pair}
\Rightarrow
\text{distillable entanglement}
\Rightarrow
\text{entanglement}
\Rightarrow
\text{correlation}.
$$

反过来都不一定成立。

尤其是：

$$
I(A:B)>0
\not\Rightarrow
E_D(A:B)>0.
$$

并且：

$$
E_N(A:B)>0
\not\Rightarrow
\text{存在干净的 EPR pair 因子}.
$$

所以讲座中说的 “No bipartite entanglement” 不能理解为：

$$
A \text{ 与 } B \text{ 完全没有任何量子相关}.
$$

更准确地说，它是：

$$
\boxed{
A \text{ 与 } B \text{ 没有可通过局域操作蒸馏出的干净 EPR 对}.
}
$$

---

# 4. 为什么 \(A\) 与 \(BC\) 有 EPR，但只拿 \(B\) 不行？

## 4.1 所需解码操作一般是 \(V_{BC}\)，不是 \(U_B\)

如前所述，若看作二分系统

$$
A|BC,
$$

存在整体幺正

$$
V_{BC}
$$

使得

$$
(I_A\otimes V_{BC})|\psi\rangle_{ABC}
\approx
|\Phi\rangle_{AR}
\otimes
|\mathrm{junk}\rangle.
$$

但这个 \(V_{BC}\) 作用在整个 \(BC\) 上。

如果我们只有 \(B\) 的 access，则只能做

$$
U_B
$$

或与 \(A\) 一起做

$$
U_A\otimes U_B.
$$

这远弱于

$$
V_{BC}.
$$

因此，尽管 \(A\) 的纠缠 partner 在 \(BC\) 中，\(B\) 单独通常无法把它解码出来。

---

## 4.2 EPR pair 要求 \(C\) 与这对 pair 解耦

如果 \(A\) 与 \(B\) 中真的能提取出一个干净 EPR pair，那么应存在分解：

$$
(U_A\otimes U_B)|\psi\rangle_{ABC}
\approx
|\Phi^+\rangle_{A_1B_1}
\otimes
|\chi\rangle_{A_2B_2C}.
$$

这意味着 \(A_1B_1\) 这对 EPR pair 几乎不和 \(C\) 相关：

$$
\rho_{A_1B_1C}
\approx
|\Phi^+\rangle\langle\Phi^+|_{A_1B_1}
\otimes
\rho_C.
$$

这叫 decoupling。

但是对典型三方 Haar 随机态，\(C\) 深度参与了 \(A\) 与 \(B\) 的相关性。\(A\)-\(B\) 的相关性不是二方私有的，而是三方共同编码的。

所以：

$$
A,B \text{ 有强相关}
$$

但

$$
A,B \text{ 没有私有的干净 EPR 对}.
$$

---

# 5. 一个低维类比：GHZ 态

GHZ 态：

$$
|\mathrm{GHZ}\rangle_{ABC}
=
\frac{|000\rangle+|111\rangle}{\sqrt{2}}.
$$

整体 \(ABC\) 是纠缠的。

并且 \(A\) 与 \(B\) 有强相关：如果测 \(A\) 得 0，则 \(B\) 也得 0；如果测 \(A\) 得 1，则 \(B\) 也得 1。

但是 trace out \(C\) 后：

$$
\rho_{AB}
=
\operatorname{Tr}_C |\mathrm{GHZ}\rangle\langle \mathrm{GHZ}|
=
\frac{1}{2}|00\rangle\langle 00|
+
\frac{1}{2}|11\rangle\langle 11|.
$$

这个 \(\rho_{AB}\) 是 separable 的经典相关态，不含 \(A\)-\(B\) 量子纠缠。

这个例子说明：

$$
ABC \text{ 整体有纠缠}
\not\Rightarrow
AB \text{ 有两方 EPR 纠缠}.
$$

三方 Haar 态比 GHZ 复杂得多，但关键直觉类似：整体纠缠不一定能分解成两两 EPR 对。

---

# 6. 报告中的 counting proof

## 6.1 证明思路

报告中的简要证明是一个 volume/counting argument。

核心逻辑：

1. 整个 \(n\)-qubit Hilbert space 中，固定精度下有大约

   $$
   \Phi_{\mathrm{state}}(n)
   \sim
   e^{O(2^n)}
   $$

   个可分辨的纯态。

2. 如果一个态含有 \(m\) 个 \(A\)-\(B\) EPR pairs，则它必须具有非常特殊的结构：

   $$
   (U_A\otimes U_B)|\psi\rangle_{ABC}
   \approx
   |\mathrm{EPR}\rangle_{AB}^{\otimes m}
   \otimes
   |\mathrm{something}\rangle.
   $$

3. 所有具有这种结构的态数量远小于所有 Haar 态数量。

4. 所以随机抽一个 Haar 态，几乎不可能抽到含 \(A\)-\(B\) EPR pair 的态。

---

## 6.2 为什么 \(\Phi_{\mathrm{state}}(n)\sim e^{O(2^n)}\)？

一个 \(n\)-qubit Hilbert space 的维度是

$$
d=2^n.
$$

虽然最多只有 \(d\) 个严格正交态，但在固定精度下，可以有大约

$$
e^{O(d)}
$$

个近似正交、几何上可分辨的态。

由于

$$
d=2^n,
$$

所以

$$
\Phi_{\mathrm{state}}(n)
\sim
e^{O(2^n)}.
$$

---

## 6.3 符号态例子

考虑态

$$
|\psi_s\rangle
=
\frac{1}{\sqrt d}
\sum_{i=1}^{d}
s_i |i\rangle,
$$

其中

$$
s_i=\pm 1.
$$

符号序列

$$
s=(s_1,\dots,s_d)
$$

有

$$
2^d
$$

种，因此态的数量为

$$
2^d
=
e^{(\ln 2)d}.
$$

两个随机符号态的 overlap 是

$$
\langle \psi_s|\psi_t\rangle
=
\frac{1}{d}
\sum_{i=1}^{d}
s_i t_i.
$$

对随机 \(s,t\)，每个 \(s_it_i\) 是随机 \(\pm 1\)，所以

$$
\frac{1}{d}
\sum_{i=1}^{d}
s_i t_i
\sim
O\left(\frac{1}{\sqrt d}\right).
$$

因此随机选两个这样的符号态，它们几乎正交。

严格地说，不是所有 \(2^d\) 个态都两两近似正交，但可以从中选出大小为

$$
e^{c d}
$$

的子集，使得任意两态 overlap 都小于某个固定 \(\epsilon\)。

这就是高维 Hilbert space 中可以容纳

$$
e^{O(d)}
$$

个近似正交态的直观原因。

---

## 6.4 \(\epsilon\)-net / packing 解释

纯态空间可以看成高维球面上的点。

一个 \(d\)-维复 Hilbert space 的单位球面实维度约为

$$
2d-1.
$$

若用固定半径 \(\epsilon\) 的小球覆盖这个空间，需要的球数大约为

$$
\left(\frac{1}{\epsilon}\right)^{O(d)}
=
e^{O(d)}.
$$

所以固定精度下，纯态空间的有效体积大小是

$$
e^{O(d)}
=
e^{O(2^n)}.
$$

---

## 6.5 含 \(m\) 个 EPR pairs 的态的结构

若存在 \(m\) 个 \(A\)-\(B\) EPR pairs 可通过局域幺正提取，则有

$$
(U_A\otimes U_B)|\psi\rangle_{ABC}
\approx
|\mathrm{EPR}\rangle_{AB}^{\otimes m}
\otimes
|\mathrm{something}\rangle.
$$

因此，一个这样的态可以由三部分指定：

$$
U_A,\quad U_B,\quad |\mathrm{something}\rangle.
$$

所以要数这种态的数量，只需要分别数：

1. \(U_A\) 的可能数量；
2. \(U_B\) 的可能数量；
3. 剩余态 \(|\mathrm{something}\rangle\) 的可能数量。

---

## 6.6 数 \(U_A\) 与 \(U_B\)

设 \(A\) 有 \(n_A\) 个 qubits，则

$$
d_A=2^{n_A}.
$$

unitary group \(U(d_A)\) 的实维度约为

$$
d_A^2
=
2^{2n_A}.
$$

因此固定精度下，\(U_A\) 的数量级是

$$
\Phi_{\mathrm{unitary}}(n_A)
\sim
e^{O(2^{2n_A})}.
$$

同理，

$$
\Phi_{\mathrm{unitary}}(n_B)
\sim
e^{O(2^{2n_B})}.
$$

也可以用 Choi-Jamiołkowski isomorphism 理解：

一个 \(n\)-qubit unitary 可以视作一个 \(2n\)-qubit Choi state，因此

$$
\Phi_{\mathrm{unitary}}(n)
\sim
\Phi_{\mathrm{state}}(2n)
\sim
e^{O(2^{2n})}.
$$

令

$$
n_R=\max(n_A,n_B),
$$

则

$$
\Phi_{\mathrm{unitary}}(n_A)
\Phi_{\mathrm{unitary}}(n_B)
\lesssim
e^{O(2^{2n_R})}.
$$

---

## 6.7 数剩余态 \(|\mathrm{something}\rangle\)

每个 \(A\)-\(B\) EPR pair 消耗 \(A\) 中一个 qubit 和 \(B\) 中一个 qubit，因此 \(m\) 个 EPR pairs 消耗总共 \(2m\) 个 qubits。

剩余态生活在

$$
n-2m
$$

个 qubits 上。

因此剩余态数量为

$$
\Phi_{\mathrm{state}}(n-2m)
\sim
e^{O(2^{n-2m})}.
$$

---

## 6.8 含 EPR pair 的态总数量上界

所以含 \(m\) 个 \(A\)-\(B\) EPR pairs 的态数量满足

$$
\Phi_{\mathrm{EPR}}(m)
\lesssim
e^{O(2^{2n_R})+O(2^{n-2m})}.
$$

而全部 \(n\)-qubit Haar 态的数量为

$$
\Phi_{\mathrm{state}}(n)
\sim
e^{O(2^n)}.
$$

如果

$$
n_A,n_B,n_C<\frac{n}{2},
$$

则

$$
n_R=\max(n_A,n_B)<\frac n2,
$$

所以

$$
2n_R<n.
$$

因此

$$
2^{2n_R}\ll 2^n.
$$

同时只要 \(m\) 不是过小，尤其是 \(m=O(n)\) 时，

$$
2^{n-2m}\ll 2^n.
$$

于是

$$
O(2^{2n_R})+O(2^{n-2m})
\ll
O(2^n).
$$

因此

$$
\frac{
\Phi_{\mathrm{EPR}}(m)
}{
\Phi_{\mathrm{state}}(n)
}
\sim
\exp[-\Omega(2^n)].
$$

这就是 doubly exponentially suppressed 的来源。

---

## 6.9 物理解释

$$
A|BC
$$

之间有 EPR-like entanglement 只要求：

> \(A\) 的 Schmidt partner 存在于整个 \(BC\) 中。

这对 Haar 随机态很典型。

但是

$$
A|B
$$

之间有 EPR-like entanglement 要求：

> \(A\) 的某些自由度的 Schmidt partner 恰好可以只在 \(B\) 中，通过 \(U_A\otimes U_B\) 整理出来。

这非常特殊。

Haar random state 通常会把 \(A\) 的 partner 随机编码进整个 \(BC\) 中，而不是局域地放进 \(B\)。

---

# 7. Fidelity bound 的含义

报告中提到：

$$
F_{\mathrm{EPR}}\leq \frac{1}{4}+o(1)
$$

这是针对局域幺正

$$
U_A\otimes U_B
$$

的结果。

对两个 qubit 而言，一个完全随机的两 qubit 态和某个固定 Bell state 的平均重叠约为

$$
\frac{1}{4}.
$$

因此这个 bound 的意思是：

> 即使你在 \(A,B\) 上做最优局域幺正，也无法比“随机猜一个 Bell state”好多少。

报告还提到，如果允许更一般的 local operation，仍然只有

$$
F_{\mathrm{EPR}}\leq \frac{1}{2}+o(1).
$$

但是这里有一个 caveat：

> 这不是完整 LOCC，因为 classical communication 被禁止。

因此这个结果严格说是：

$$
\boxed{
\text{LU/LO 不能从 } A,B \text{ 中蒸馏出干净 EPR pair}.
}
$$

而不是完整地解决了所有可能 LOCC 协议下的 distillability 问题。

---

# 8. Petz map 部分

## 8.1 为什么 Petz map 与 EPR distillation 有关？

考虑一个编码过程：

$$
C \rightarrow AB.
$$

如果 \(C\) 的信息可以从 \(B\) 或 \(A\) 恢复，则说明某个子系统中保留了关于 reference 的量子信息。

在 purified picture 里，recoverability 可以转化为：

> 是否能从某个子系统中恢复出与 reference 最大纠缠的 EPR pair。

因此：

$$
\text{recoverability}
\quad
\Longleftrightarrow
\quad
\text{entanglement with reference}.
$$

如果 \(A\) 和 \(B\) 之间真的有 EPR-like entanglement，那么应该存在某个 decoder

$$
\mathcal D_{B\to A'}
$$

使得

$$
\sigma_{AA'}
=
(\mathrm{id}_A\otimes \mathcal D_{B\to A'})(\rho_{AB})
$$

接近最大纠缠态：

$$
\sigma_{AA'}
\approx
|\Phi\rangle\langle\Phi|_{AA'}.
$$

也就是说，\(B\) 中应该可以恢复出 \(A\) 的纠缠 partner \(A'\)。

---

## 8.2 Petz map 是什么？

给定一个 channel

$$
\mathcal N:A\to B
$$

和参考态

$$
\rho_A,
$$

令

$$
\rho_B=\mathcal N(\rho_A).
$$

Petz recovery map 定义为

$$
\mathcal R^{\mathrm{Petz}}_{B\to A}(X_B)
=
\rho_A^{1/2}
\mathcal N^\dagger
\left[
\rho_B^{-1/2}
X_B
\rho_B^{-1/2}
\right]
\rho_A^{1/2}.
$$

它的意义是：

> 尝试将 channel \(\mathcal N\) 的作用反过来，从 \(B\) 中恢复 \(A\)。

Petz map 不是总是最优 decoder，但它是 pretty good decoder。

有一类 Barnum-Knill 型结果说：

> 如果存在某个 decoder 可以以 fidelity \(1-\epsilon\) 恢复 EPR pair，那么 Petz map 至少可以以约 \(1-2\epsilon\) 的 fidelity 恢复。

因此其逆否命题是：

> 如果 Petz map 明显失败，那么最优 decoder 也不可能高保真成功。

---

## 8.3 在这里如何构造 recovery 问题？

我们有

$$
|\psi\rangle_{ABC}.
$$

只看 \(AB\)：

$$
\rho_{AB}=
\operatorname{Tr}_C |\psi\rangle\langle\psi|.
$$

可以将 \(\rho_{AB}\) 视为某个 channel 的 Choi state：

$$
\rho_{AB}
\quad
\leftrightarrow
\quad
\mathcal N_{A\to B}.
$$

如果 \(B\) 中含有 \(A\) 的 EPR partner，则应该存在 recovery map

$$
\mathcal D_{B\to A'}
$$

使得

$$
(\mathrm{id}_A\otimes \mathcal D_{B\to A'})(\rho_{AB})
\approx
|\Phi\rangle\langle\Phi|_{AA'}.
$$

Petz map 给出一个 canonical recovery candidate：

$$
\mathcal R^{\mathrm{Petz}}_{B\to A'}.
$$

于是考察：

$$
\sigma_{AA'}
=
(\mathrm{id}_A\otimes \mathcal R^{\mathrm{Petz}}_{B\to A'})(\rho_{AB}).
$$

如果 \(\sigma_{AA'}\) 接近 EPR，则说明 \(B\) 中能恢复出 \(A\) 的 partner。

如果 \(\sigma_{AA'}\) 很混，则说明 \(B\) 不包含可恢复的 \(A\) partner。

---

## 8.4 Haar 随机态下 Petz map 输出什么？

报告中的结果是：Petz map 输出的不是 EPR pair，而是一个所谓的 doubled state。

图像上，它类似于把两份 \(\psi\) 和两份 \(\psi^*\) 沿着 \(B\) 的 legs glue 起来，剩下 \(A,A'\) 作为输出。

这和随机张量网络中计算 Rényi entropy 时出现的 replica/doubled tensor network 很相似。

记输出为

$$
\sigma_{AA'}.
$$

如果 Petz map 成功恢复 EPR，则

$$
\sigma_{AA'}
\approx
|\Phi\rangle\langle\Phi|_{AA'}.
$$

此时它应接近纯态，所以

$$
S(AA')\approx 0.
$$

尤其是所有 Rényi entropy 都应该接近 0。

---

## 8.5 报告给出的 Rényi entropy

报告中给出：

$$
S_{AA'}^{(\alpha)}
=
\frac{\alpha}{\alpha-1}
\left(
n_A+n_C-n_B
\right).
$$

在考虑的 regime 中，

$$
n_B<\frac n2.
$$

又因为

$$
n=n_A+n_B+n_C,
$$

所以

$$
n_A+n_C-n_B
=
n-2n_B>0.
$$

因此

$$
S_{AA'}^{(\alpha)}
$$

是 extensive 的，通常为 \(O(n)\)。

这说明 Petz map 输出的 \(\sigma_{AA'}\) 高度混合，不是接近纯 EPR pair 的状态。

---

## 8.6 用二阶 Rényi entropy 看最清楚

取

$$
\alpha=2.
$$

则

$$
S_{AA'}^{(2)}
=
2(n_A+n_C-n_B).
$$

二阶 Rényi entropy 定义为

$$
S_2(\sigma)
=
-\log \operatorname{Tr}\sigma^2.
$$

因此

$$
\operatorname{Tr}\sigma_{AA'}^2
=
2^{-S_2}
=
2^{-2(n_A+n_C-n_B)}.
$$

如果 \(\sigma_{AA'}\) 是纯 EPR pair，则

$$
\operatorname{Tr}\sigma_{AA'}^2=1.
$$

但这里 purity 指数小：

$$
\operatorname{Tr}\sigma_{AA'}^2
\sim
2^{-O(n)}.
$$

所以 Petz 输出离纯态很远。

进一步，对任意纯态 \(|\phi\rangle\)，有

$$
\langle \phi|\sigma|\phi\rangle
\leq
\lambda_{\max}(\sigma)
\leq
\sqrt{\operatorname{Tr}\sigma^2}.
$$

所以如果

$$
\operatorname{Tr}\sigma^2
$$

指数小，则任何纯态，包括 EPR state，与 \(\sigma\) 的 fidelity 都不会接近 1。

因此 Petz map 没有恢复出 EPR pair。

---

## 8.7 Petz map 结论

Petz map 的逻辑是：

1. 如果 \(B\) 中真的包含 \(A\) 的 EPR partner，则应该存在 decoder

   $$
   B\to A'
   $$

   使得 \(AA'\) 接近 EPR。

2. Petz map 是 pretty good decoder。

3. 若最优 decoder 成功，则 Petz map 也应接近成功。

4. 但直接计算 Petz map 输出，得到的是高度混合的 doubled state。

5. 因此 \(B\) 中没有可高保真恢复的 \(A\) partner。

这从 recovery 角度说明：

$$
A \text{ 与 } B \text{ 之间没有可蒸馏 EPR-like entanglement}.
$$

---

## 8.8 Replica limit subtlety

报告还提到：

$$
S_{AA'}^{(1)}
\neq
\lim_{\alpha\to 1}S_{AA'}^{(\alpha)}.
$$

这是因为整数 Rényi entropy 的计算由某些 replica saddle 主导，但当 \(\alpha\to 1\) 时，主导 saddle 可能改变，analytic continuation 不一定合法。

这类似随机系统和 holography 中常见的 replica subtlety。

但对这里的结论来说，不需要真正求 von Neumann entropy。只要某个 \(\alpha>1\) 的 Rényi entropy 是 extensive，就已经足够说明输出不是纯 EPR。

---

# 9. Counting proof 与 Petz map 的关系

二者是互补视角。

## 9.1 Counting proof 说

含有 \(A\)-\(B\) EPR pair 的态需要特殊结构：

$$
(U_A\otimes U_B)|\psi\rangle
\approx
|\mathrm{EPR}\rangle^{\otimes m}
\otimes
|\mathrm{something}\rangle.
$$

这种态在 Haar 态空间中的体积极小。

所以典型 Haar 态不会有这种结构。

---

## 9.2 Petz map 说

如果 \(B\) 真能恢复 \(A\) 的 EPR partner，那么 Petz map 应该能恢复出接近纯 EPR 的 \(AA'\)。

但实际 Petz 输出是高度混合的 doubled state。

所以 \(B\) 中没有这个可恢复的 partner。

---

## 9.3 统一图像

$$
A|BC
$$

之间有 EPR-like entanglement。

但是 \(A\) 的 partner 是非局域地编码在 \(BC\) 中。

只拿到 \(B\) 时：

$$
B \text{ cannot decode the partner}.
$$

因此：

$$
A,B \text{ 有强量子相关}
$$

但

$$
A,B \text{ 没有干净的 EPR-like bipartite entanglement}.
$$

---

# 10. 与 holography 的关系

## 10.1 大 mutual information 不等于很多 EPR pairs

在 holography 中，两个边界区域 \(A,B\) 可以有很大的 mutual information：

$$
I(A:B)=O(1/G_N).
$$

传统直觉可能会把这理解成：

$$
A,B \text{ 之间有很多 EPR pairs}.
$$

但三方 Haar 随机态的结果说明：

$$
I(A:B) \text{ large}
\not\Rightarrow
A,B \text{ share many EPR pairs}.
$$

即使

$$
E_N(A:B)
$$

也很大，也不一定意味着 \(A,B\) 之间有可提取的 EPR pairs。

---

## 10.2 对 bit thread / pairwise entanglement 图像的挑战

如果把纠缠想象成很多两两连接的 EPR 线：

$$
A\leftrightarrow B,\quad
A\leftrightarrow C,\quad
B\leftrightarrow C,
$$

那么大 \(I(A:B)\) 似乎应该意味着有很多 \(A\)-\(B\) 线。

但该结果说明，Haar-like 高度随机态中的纠缠不是这种 pairwise EPR line 结构。

它更像真正的 multipartite entanglement：

$$
A,B,C
$$

整体被随机编码在一起。

所以这对 “mostly bipartite entanglement” 的直觉形成挑战。

---

# 11. 与量子纠错的关系

## 11.1 随机编码

考虑一个随机编码：

$$
C \rightarrow AB.
$$

这里 \(C\) 是输入逻辑系统，\(AB\) 是输出物理系统。

如果逻辑信息可以从 \(A\) 恢复，则存在 decoder

$$
\mathcal D_A:A\to C.
$$

如果可以从 \(B\) 恢复，则存在 decoder

$$
\mathcal D_B:B\to C.
$$

---

## 11.2 Haar 随机编码中的现象

在 Haar random encoding 中，逻辑信息确实被编码在 \(AB\) 中。

但它通常不能从 \(A\) 单独恢复，也不能从 \(B\) 单独恢复。

也就是说：

$$
A \text{ alone supports no nontrivial logical unitary},
$$

$$
B \text{ alone supports no nontrivial logical unitary}.
$$

只有联合系统 \(AB\) 才能恢复逻辑信息。

这与某些稳定子码中的 cleaning lemma 直觉不同。

---

## 11.3 Complementary recovery 的 breakdown

在 holographic quantum error correction 中，人们常有 complementary recovery 的直觉：

> 如果 bulk 信息不能从 \(A\) 恢复，那么它应该能从 \(A^c\) 恢复。

但 Haar/random encoding 的结果说明：

> 有些逻辑信息可能既不能从 \(A\) 单独恢复，也不能从 \(B\) 单独恢复，只能从 \(AB\) 联合恢复。

这说明 complementary recovery 在某些高度随机或更一般的编码结构中可能失效。

---

# 12. 与 baby universe / closed universe 的关系

报告后面讨论 baby universe 或 closed universe。

设想两个边界系统 \(A,B\) 之间存在一个 closed universe 区域 \(C\)。

问题是：

> 如果 \(C\) 没有边界，它的 microscopic details 编码在哪里？

报告给出的图像是：

$$
C \text{ is a logical qubit encoded into } AB.
$$

也就是说，\(C\) 的信息被编码进 \(AB\) 的联合系统中。

但由于这是类似 Haar random encoding 的结构，\(C\) 的信息不能从 \(A\) 单独读出，也不能从 \(B\) 单独读出。

只有访问 \(AB\) 的联合系统才可能恢复它。

这与前面的结论一致：

$$
\text{information is globally encoded, not locally accessible}.
$$

---

# 13. 最重要的物理启示

## 13.1 纠缠不是一定由 EPR pairs 组成

以前容易有一种直觉：

> 复杂量子态里的纠缠可以理解为很多两两 EPR pairs。

但三方 Haar 随机态说明，这个图像不一般。

一个态可以有：

$$
I(A:B)=O(n),
$$

也可以有大的 logarithmic negativity，

但仍然没有可以局域蒸馏出来的 \(A\)-\(B\) EPR pairs。

所以：

$$
\text{large quantum correlation}
\neq
\text{many EPR pairs}.
$$

---

## 13.2 纠缠可能是真正多方化的

三方 Haar 随机态中的纠缠更像：

$$
\text{multipartite random encoding}.
$$

它不是：

$$
AB \text{ 有一些 EPR},\quad
AC \text{ 有一些 EPR},\quad
BC \text{ 有一些 EPR}.
$$

而是：

$$
ABC \text{ 整体形成复杂的多方纠缠结构}.
$$

---

## 13.3 大互信息不代表可传输量子信息

\(I(A:B)\) 只是总相关。

它可以来自：

1. 经典相关；
2. 量子相关；
3. 多方编码导致的复杂相关；
4. 不能蒸馏的 entanglement-like structure。

所以即使

$$
I(A:B)
$$

很大，也不能马上推出：

$$
A,B \text{ 可以共享可用的 EPR 资源}.
$$

---

## 13.4 对 quantum gravity 的启示

在 holography 和 quantum gravity 中，边界区域之间的大相关可能不是由简单的 EPR bridges 或 pairwise entanglement 组成，而是由更复杂的多方纠缠或量子纠错编码结构支撑。

这会影响我们对以下概念的理解：

1. holographic mutual information；
2. entanglement wedge reconstruction；
3. complementary recovery；
4. baby universe；
5. closed universe；
6. random tensor network；
7. black hole interior encoding。

---

# 14. Caveats：这个结果不能过度推广

## 14.1 Haar random 是非常强的随机性假设

Haar random state 是极端随机的对象。

真实物理系统通常不是完全 Haar random。

例如：

1. local random circuits；
2. chaotic spin chains；
3. Floquet systems；
4. T-doped Clifford circuits；
5. random tensor networks with geometry；
6. holographic CFT states；

它们可能有 locality、symmetry、energy constraints、code subspace constraints 等结构。

所以该结果不是说：

> 所有复杂物理态都没有 \(A\)-\(B\) EPR-like entanglement。

而是说：

> 在足够 Haar-like 的三方随机态中，大量 quantum correlation 不会自动转化为 pairwise EPR resources。

---

## 14.2 报告中的蒸馏限制不是完整 LOCC

报告中强调：

> This is NOT LOCC.

它讨论的主要是：

$$
U_A\otimes U_B
$$

以及某些不含 classical communication 的 local operations。

所以严格地说，结论应写成：

$$
\text{No LU/LO-distillable EPR pairs}.
$$

而不是直接宣称所有 LOCC 协议下都没有 distillable entanglement，除非文章后续有更强证明。

---

# 15. 最终理解图像

## 15.1 错误图像

不要把三方 Haar 态想成很多 EPR 线：

$$
A \leftrightarrow B,
\quad
A \leftrightarrow C,
\quad
B \leftrightarrow C.
$$

如果这样想，你会自然觉得：

> \(A\) 和 \(B\) 之间应该有一些 EPR 线。

但这不是 Haar 三方态的典型结构。

---

## 15.2 正确图像

更好的图像是：

$$
A,B,C
$$

被一个巨大随机编码整体搅在一起。

\(A\) 的纠缠 partner 在

$$
BC
$$

中存在，但它不是 \(B\) 的某个简单局域自由度，而是一个分布在 \(BC\) 上的 logical subsystem。

如果只访问 \(B\)，无法恢复这个 partner。

所以：

$$
A \leftrightarrow BC
$$

有 EPR-like entanglement，

但

$$
A \leftrightarrow B
$$

没有可局域蒸馏的干净 EPR pair。

---

# 16. 最后可以记住的几句话

## 16.1 第一条

$$
S(A)
$$

在三方纯态中衡量的是

$$
A \text{ 与 } BC
$$

之间的纠缠，不是

$$
A \text{ 与 } B
$$

之间的纠缠。

---

## 16.2 第二条

$$
I(A:B)
$$

和

$$
E_N(A:B)
$$

可以很大，但这不等于有

$$
A\text{-}B
$$

EPR pairs。

---

## 16.3 第三条

EPR pair 是一种非常特殊的纠缠结构。

Haar random state 虽然高度纠缠，但几乎不可能刚好含有可由

$$
U_A\otimes U_B
$$

整理出来的 EPR pair 因子。

---

## 16.4 第四条

Counting proof 的本质是：

$$
\text{states with EPR structure}
\ll
\text{all Haar states}.
$$

所以随机抽到 EPR-structured state 的概率双指数小。

---

## 16.5 第五条

Petz map 的本质是：

> 如果 \(B\) 真的含有 \(A\) 的 EPR partner，那么 Petz map 应该能恢复它；但实际 Petz 输出高度混合，所以 \(B\) 不含可恢复的干净 partner。

---

## 16.6 第六条

这件事的核心启示是：

$$
\boxed{
\text{复杂量子态中的强相关可以是多方编码结构，而不是两两 EPR 对结构。}
}
$$